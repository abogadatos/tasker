import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
export declare class usersCustomRepo {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    seedUsersTable(): any;
    getUser(userID: string): unknown;
}
