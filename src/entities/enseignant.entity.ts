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
  
  @Entity('enseignant')
  export class Enseignant extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;
  
  }