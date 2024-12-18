import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { taskCustomRepo } from './task.repository';
import { Tasks } from 'src/databases/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tasks])],
  controllers: [TasksController],
  providers: [TasksService, taskCustomRepo],
})
export class TasksModule {}
