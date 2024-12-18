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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../databases/entities/user.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepository, usersCustomRepo) {
        this.usersRepository = usersRepository;
        this.usersCustomRepo = usersCustomRepo;
    }
    async onModuleInit() {
        this.seedUsers();
    }
    async seedUsers() {
        return await this.usersCustomRepo.seedUsersTable();
    }
    async getUserByID(userID) {
        return await this.usersCustomRepo.getUser(userID);
    }
    async getUsers(page, limit, sortBy, order) {
        const [users, total] = await this.usersRepository
            .createQueryBuilder('users')
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy(sortBy, order)
            .getManyAndCount();
        const totalPages = Math.ceil(total / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        return {
            users,
            sortedBy: sortBy,
            ordered: order,
            totalElements: total,
            page,
            limit,
            totalPages,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        };
    }
    async updateUser(userData, userID) {
        const foundUser = await this.usersRepository.findOne({
            where: { id: userID },
        });
        if (!foundUser)
            throw new common_1.NotFoundException('user not found or not exist');
        const updatedUser = this.usersRepository.merge(foundUser, userData);
        await this.usersRepository.save(updatedUser);
        const { password, ...filteredUser } = updatedUser;
        return { message: 'User Update Successfully', filteredUser };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, users_repository_1.usersCustomRepo])
], UsersService);
//# sourceMappingURL=users.service.js.map