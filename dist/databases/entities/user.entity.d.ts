import { Tasks } from './task.entity';
import { Role } from 'src/enums/roles.enum';
export declare class User {
    id: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    roles: Role;
    country: string;
    city: string;
    address: string;
    updatedAt: Date;
    createdAt: Date;
    tasks: Tasks[];
}
