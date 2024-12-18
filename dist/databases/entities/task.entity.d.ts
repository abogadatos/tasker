import { User } from './user.entity';
export declare class Tasks {
    id: string;
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en progreso' | 'completeda';
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
    updatedAt: Date;
    createdAt: Date;
    user: User;
}
