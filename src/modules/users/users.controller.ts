import {
  Controller,
  Get,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('UsersSeeder')
  async seedUsers() {
    return await this.usersService.seedUsers();
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  async userGetter(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sortBy') sortBy: string = 'roles',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ) {
    try {
      const pageQuery = Number(page);
      const limitQuery = Number(limit);
      if (pageQuery && limitQuery) {
        return await this.usersService.getUsers(
          pageQuery,
          limitQuery,
          sortBy,
          order,
        );
      } else return await this.usersService.getUsers(1, 5, sortBy, order);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error:
            'It wasnt possible to fetch users. Check if they do exist within database',
        },
        404,
      );
    }
  }
}
