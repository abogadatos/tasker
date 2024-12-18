import { User } from '../../../databases/entities/user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;
