import { Tasks } from 'src/databases/entities/task.entity';
import { Repository } from 'typeorm';
export declare class taskCustomRepo {
    private tasksRepository;
    constructor(tasksRepository: Repository<Tasks>);
    findAllTask(): unknown;
}
