import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Timestamp } from '../generics/timestamps';
import { Etudiant } from './etudiant.entity';

@Entity('annee_scolaire')
export class AnneeScolaire extends Timestamp {
  @PrimaryGeneratedColumn()
  year: number;

  @OneToMany(() => Etudiant, students => students.year)
  students: Etudiant[];

}