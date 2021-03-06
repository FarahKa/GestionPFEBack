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

@Entity('enseignant')
export class Enseignant extends Timestamp {

    @PrimaryColumn()
    @OneToOne(() => User, {eager: true})
    @JoinColumn({ name: "cin" })
    cin: string;
  
    @Column()
    firstname: string;
  
    @Column()
    lastname: string;
  
    @Column()
      phoneNumber: number;

    @Column({
      type: 'enum',
      enum: DepEnum,
    })
    departement: DepEnum;
}