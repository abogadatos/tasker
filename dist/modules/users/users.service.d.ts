import { OnModuleInit } from '@nestjs/common';
import { usersCustomRepo } from './users.repository';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class UsersService implements OnModuleInit {
    private usersRepository;
    private usersCustomRepo;
    constructor(usersRepository: Repository<User>, usersCustomRepo: usersCustomRepo);
    onModuleInit(): any;
    seedUsers(): unknown;
    getUserByID(userID: string): unknown;
    getUsers(page: number, limit: number, sortBy: string, order: 'ASC' | 'DESC'): unknown;
    updateUser(userData: UpdateUserDto, userID: string): unknown;
}
