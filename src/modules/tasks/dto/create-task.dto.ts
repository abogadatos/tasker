import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  titulo: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  descripcion: string;

  @IsOptional()
  @IsEnum(['pendiente', 'en progreso', 'completeda'], {
    message:
      'Status must be either "pendiente", "en progreso", or "completeda".',
  })
  estado: 'pendiente' | 'en progreso' | 'completeda';

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'], {
    message: 'Priority must be either "low", "medium", or "high".',
  })
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsDateString({}, { message: 'Due date must be a valid ISO date string.' })
  dueDate?: string;

  @IsNotEmpty()
  @IsString()
  userId: string; // Assuming each task is linked to a user
}
