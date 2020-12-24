import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from '../../generics/timestamps';

@Entity('session')
export class SessionEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    type: 'date',
  })
  start_date: Date;

  @Column({
    type: 'date',
  })
  end_date: Date;
}
