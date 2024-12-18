import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from 'src/databases/entities/task.entity';
import { usersCustomRepo } from './users.repository';
import { User } from 'src/databases/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, User])],
  controllers: [UsersController],
  providers: [UsersService, usersCustomRepo, JwtService],
  exports: [usersCustomRepo, UsersService],
})
export class UsersModule {}
