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
  
  @Entity('annee-scolaire')
  export class AnneeScolaire extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;
  
  }