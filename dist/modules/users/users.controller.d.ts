import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    seedUsers(): unknown;
    userGetter(page: string, limit: string, sortBy?: string, order?: 'ASC' | 'DESC'): unknown;
}
