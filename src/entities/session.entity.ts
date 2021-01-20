import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from '../generics/timestamps';
import { Soutenance } from './soutenance.entity';

@Entity('session')
export class Session extends Timestamp {
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

  @OneToMany(() => Soutenance, soutenance => soutenance.session)
  soutenances : Soutenance[];
}
