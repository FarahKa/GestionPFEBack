import { Timestamp } from './../generics/timestamps';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AnneeScolaire } from './annee-scolaire.entity';
import { User } from './user.entity';
import { PFE } from './pfe.entity';
import { Soutenance } from './soutenance.entity';
import { FiliereEnum } from '../enums/filere.enum'


@Entity('etudiant')
@Index(["cin", "year"], { unique: true })
export class Etudiant extends Timestamp {

  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn({ name: "cin" })
  cin: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
    phoneNumber: number;

    
  @PrimaryColumn()
  @ManyToOne(() => AnneeScolaire,
    year => year.year,
    {
      primary: true,
      nullable: false,
      eager: true
    })
  @JoinColumn({ name: "year" })
  year: AnneeScolaire;

  @Column()
  student_id_number: number;

  @Column({
    type: 'enum',
    enum: FiliereEnum,
  })
  filiere: FiliereEnum;
/*
  @OneToOne(() => PFE)
  @JoinColumn({ name: "pfeId" })
  pfe: PFE;*/

  @OneToOne(() => Soutenance)
  @JoinColumn({ name: "soutenanceId" })
  soutenance: Soutenance;

}