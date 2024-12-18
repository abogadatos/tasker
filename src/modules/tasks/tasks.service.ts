import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from 'src/databases/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async getAllTasks(): Promise<Tasks[]> {
    return this.tasksRepository.find();
  }

  async getTask(id: string): Promise<Tasks> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
    const task = await this.getTask(id);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
