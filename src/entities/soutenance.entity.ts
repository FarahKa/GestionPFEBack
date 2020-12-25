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
import { Session } from './session.entity';
  
  @Entity('soutenance')
  export class Soutenance extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
      })
    date: Date;

    @ManyToOne(type => Session, session => session.id)
    session : Session;

  }