"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../databases/entities/user.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("./../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, usersService, jwtService) {
        this.usersRepository = usersRepository;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    registerSuccesful() {
        return `You were registered successfuly`;
    }
    async signUp(userData) {
        const checkUser = await this.usersRepository.find({
            where: { email: userData.email },
        });
        if (checkUser.length)
            throw new common_1.ConflictException('user with this email already exists');
        const newUser = this.usersRepository.create(userData);
        const { password, email } = newUser;
        if (!password || !email)
            throw new common_1.BadRequestException('Valid email and password are required');
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException(`Password encryption error`);
        }
        else {
            newUser.password = hashedPassword;
        }
        await this.usersRepository.save(newUser);
        const user = await this.usersService.getUserByID(newUser.id);
        return user;
    }
    async signIn(userData) {
        const userExists = await this.usersRepository.find({
            where: { email: userData.email },
        });
        if (userExists.length === 0)
            throw new common_1.NotFoundException('User does not exist');
        const userFound = await this.usersRepository.findOne({
            where: { email: userData.email },
        });
        const confirmPassword = await bcrypt.compare(userData.password, userFound.password);
        console.log('User Data:', userData);
        console.log('Found User:', userFound);
        console.log('Found User ROLE:', userFound.roles);
        console.log('Password Match:', confirmPassword);
        if (confirmPassword === true) {
            const userPayload = {
                id: userFound.id,
                email: userFound.email,
                roles: userFound.roles,
            };
            const token = this.jwtService.sign(userPayload);
            return {
                message: 'User logged in successfuly',
                userID: userFound.id,
                roles: userFound.roles,
                token: token,
                expires_in: process.env.JWT_EXPIRES_IN,
            };
        }
        else
            throw new common_1.BadRequestException('Incorrect Credentials');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, users_service_1.UsersService, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map