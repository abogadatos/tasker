import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from 'src/databases/entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(createTaskDto: CreateTaskDto): Promise<Tasks>;
    getAllTasks(): Promise<Tasks[]>;
    getTask(id: string): Promise<Tasks>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Tasks>;
    deleteTask(id: string): Promise<void>;
}
