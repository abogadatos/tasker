import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../databases/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UserWithoutPassword } from '../users/types/userWithoutPassword.type';
import { UsersService } from './../users/users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  registerSuccesful(): string {
    return `You were registered successfuly`;
  }

  async signUp(userData: CreateUserDto): Promise<Partial<User>> {
    const checkUser: User[] = await this.usersRepository.find({
      where: { email: userData.email },
    });
    if (checkUser.length)
      throw new ConflictException('user with this email already exists');

    const newUser: User = this.usersRepository.create(userData);

    const { password, email } = newUser;

    if (!password || !email)
      throw new BadRequestException('Valid email and password are required');

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      throw new BadRequestException(`Password encryption error`);
    } else {
      newUser.password = hashedPassword;
    }

    await this.usersRepository.save(newUser);
    const user: UserWithoutPassword = await this.usersService.getUserByID(
      newUser.id,
    );

    return user;
  }

  async signIn(userData: LoginUserDto) {
    const userExists: User[] = await this.usersRepository.find({
      where: { email: userData.email },
    });

    if (userExists.length === 0)
      throw new NotFoundException('User does not exist');

    const userFound: User | undefined = await this.usersRepository.findOne({
      where: { email: userData.email },
    });

    const confirmPassword = await bcrypt.compare(
      userData.password,
      userFound.password,
    );

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
    } else throw new BadRequestException('Incorrect Credentials');
  }
}
