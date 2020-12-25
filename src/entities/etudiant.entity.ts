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
  
  @Entity('etudiant')
  export class Etudiant extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;
  
  }