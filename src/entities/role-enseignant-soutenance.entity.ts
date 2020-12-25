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
  
  @Entity('roleEnseignantSoutenance')
  export class RoleEnseignantSoutenance extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;
  
  }