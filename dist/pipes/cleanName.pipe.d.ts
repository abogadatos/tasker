import { PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto';
export declare class CleanDataPipe implements PipeTransform {
    private cleanField;
    transform(value: CreateUserDto): CreateUserDto;
}
