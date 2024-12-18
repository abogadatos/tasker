import { User } from '../../databases/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from './../users/users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private readonly usersService;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, usersService: UsersService, jwtService: JwtService);
    registerSuccesful(): string;
    signUp(userData: CreateUserDto): Promise<Partial<User>>;
    signIn(userData: LoginUserDto): unknown;
}
