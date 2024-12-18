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
exports.usersCustomRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../databases/entities/user.entity");
const typeorm_2 = require("typeorm");
const mockedUser = require("../../utils/users-mock.json");
const bcrypt = require("bcrypt");
let usersCustomRepo = class usersCustomRepo {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async seedUsersTable() {
        const checkTablePopulation = await this.usersRepository.count();
        if (checkTablePopulation === 0) {
            console.info(`No users found within the database.`);
            for (const user of mockedUser) {
                console.info(`Inserting ${user.fullName} within the database.`);
                await this.usersRepository
                    .createQueryBuilder()
                    .insert()
                    .into(user_entity_1.User)
                    .values({
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    password: await bcrypt.hash(user.password, 10),
                    roles: user.roles,
                    country: user.country,
                    city: user.city,
                    address: user.address,
                })
                    .orIgnore()
                    .execute();
            }
        }
    }
    async getUser(userID) {
        const userFound = await this.usersRepository.findOne({
            where: { id: userID },
            relations: ['tasks'],
        });
        if (!userFound)
            throw new common_1.NotFoundException(`User not found or does't exist`);
        const { password, ...rest } = userFound;
        return rest;
    }
};
exports.usersCustomRepo = usersCustomRepo;
exports.usersCustomRepo = usersCustomRepo = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], usersCustomRepo);
//# sourceMappingURL=users.repository.js.map