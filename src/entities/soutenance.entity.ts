import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Timestamp } from '../generics/timestamps';
import { PFE } from './pfe.entity';
import { Session } from './session.entity';
  
  @Entity('soutenance')
  export class Soutenance extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
      })
    date: Date;
    
// lezem e soutenance tchouf e session ? yeaaa just in case we need it
    @ManyToOne(() => Session, session => session.id)
    @JoinColumn({ name: "sessionId" })
    session : Session;

    @OneToOne(() => PFE)
    @JoinColumn({ name: "pfeId" })
    pfe: PFE;

  }