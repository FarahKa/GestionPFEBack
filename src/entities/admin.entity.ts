import { DepEnum } from 'src/enums/departement.enum';
import {
  ChildEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Timestamp } from '../generics/timestamps';
import { User } from './user.entity';

@Entity('admin')
export class Admin extends Timestamp {

    @PrimaryColumn()
    @OneToOne(() => User)
    @JoinColumn({ name: "cin" })
    cin: string;
  
    @Column()
    firstname: string;
  
    @Column()
    lastname: string;
  
    @Column()
      phoneNumber: number;
}