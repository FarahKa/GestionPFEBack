import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Timestamp } from '../generics/timestamps';

@Entity('pfe')
export class PFE extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

}