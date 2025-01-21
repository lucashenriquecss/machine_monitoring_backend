
import { Roles } from './user-roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  name: string;
  
  @Column({ unique: true })
  email: string;
  
  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'text',  nullable: true })
  profile_photo: string

  @Column()
  phone: string

  @Column({ type: 'boolean',  nullable: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: Roles, default: [Roles.COMMON] })
  roles: Roles[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;


}