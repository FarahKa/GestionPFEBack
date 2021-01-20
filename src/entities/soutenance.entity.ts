import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Timestamp } from '../generics/timestamps';
import { Etudiant } from './etudiant.entity';
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

    @ManyToOne(() => Session, session => session.soutenances)
    @JoinColumn({ name: "sessionId" })
    session : Session;

    @OneToOne(() => Etudiant, etudiant => etudiant.soutenance)
    etudiant : Etudiant;

    @OneToOne(() => PFE)
    @JoinColumn({ name: "pfeId" })
    pfe: PFE;



  }