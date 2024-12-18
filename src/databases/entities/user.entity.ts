import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tasks } from './task.entity';
import { Role } from 'src/enums/roles.enum';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roles: Role;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  address: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Tasks, (tasks) => tasks.user)
  @JoinColumn({ name: 'tasks_ID' })
  tasks: Tasks[];
}
