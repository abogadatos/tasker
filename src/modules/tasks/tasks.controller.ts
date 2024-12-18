import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from 'src/databases/entities/task.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Associate, Role.Admin, Role.SuperAdmin)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  async getAllTasks(): Promise<Tasks[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Associate, Role.Admin, Role.SuperAdmin)
  async getTask(@Param('id') id: string): Promise<Tasks> {
    return await this.tasksService.getTask(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Associate, Role.Admin, Role.SuperAdmin)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks> {
    return await this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Associate, Role.Admin, Role.SuperAdmin)
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }
}
