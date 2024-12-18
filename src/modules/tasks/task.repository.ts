import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'src/databases/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class taskCustomRepo {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  async findAllTask() {
    const tasks = await this.tasksRepository.find({
      relations: {
        user: true,
      },
    });

    return tasks;
  }
}
