import { RoleEnseignantEnum } from 'src/enums/role-enseignant.enum';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Timestamp } from '../generics/timestamps';
import { Enseignant } from './enseignant.entity';
import { Soutenance } from './soutenance.entity';

@Entity('roleEnseignantSoutenance')
@Index(["role", "enseignant", "soutenance"], { unique: true })
export class RoleEnseignantSoutenance extends Timestamp {
  @PrimaryColumn({
    type: 'enum',
    enum: RoleEnseignantEnum,
    default: RoleEnseignantEnum.membre_jury
  }
  )
  role: RoleEnseignantEnum;


  @ManyToOne(
    () => Enseignant,
    {
      primary: true,
      nullable: false,
    })
  @JoinColumn({ name: "enseignantId" })
  enseignant: Enseignant;


  @ManyToOne(
    () => Soutenance,
    {
      primary: true,
      nullable: false,
    })
  @JoinColumn({ name: "soutenanceId" })
  soutenance: Soutenance;

}