import { PFEStateEnum } from 'src/enums/pfe-state.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from '../generics/timestamps';

@Entity('pfe')
export class PFE extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PFEStateEnum,
  })
  state: PFEStateEnum;

  @Column()
  subject: string;

  @Column()
  private: boolean;

  @Column()
  rapport: string; //link 

  @Column()
  hosting_enterprise: string;

  @Column({ default: false })
  valid: boolean;

}