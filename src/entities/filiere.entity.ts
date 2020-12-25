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
  
  @Entity('filiere')
  export class Filiere extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;
  
  }