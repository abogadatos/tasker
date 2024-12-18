export declare class CreateTaskDto {
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en progreso' | 'completeda';
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
    userId: string;
}
