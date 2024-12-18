import { AuthService } from './auth.service';
import { CreateUserDto } from '../../modules/users/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
export declare class AuthController {
    private readonly authService;
    private credentials;
    constructor(authService: AuthService);
    signIn(userData: LoginUserDto): unknown;
    signUp(userData: CreateUserDto): unknown;
}
