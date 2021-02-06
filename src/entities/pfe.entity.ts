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

  @Column({nullable: true,})
  subject: string;

  @Column({nullable: true,})
  private: boolean;

  @Column({nullable: true,})
  rapport: string; //link 

  @Column({nullable: true,})
  hosting_enterprise: string;

  @Column({ default: false })
  valid: boolean;

}