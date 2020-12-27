import {
  ChildEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Timestamp } from '../generics/timestamps';
import { User } from './user.entity';

@Entity('enseignant')
export class Enseignant extends User{
}