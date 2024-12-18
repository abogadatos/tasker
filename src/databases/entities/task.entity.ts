import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  titulo: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'en progreso', 'completeda'],
    default: 'pendiente',
  })
  estado: 'pendiente' | 'en progreso' | 'completeda';

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  priority: 'low' | 'medium' | 'high';

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  dueDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
