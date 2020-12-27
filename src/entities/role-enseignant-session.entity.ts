
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { RoleEnseignantEnum } from 'src/enums/role-enseignant.enum';
import { Enseignant } from './enseignant.entity';
import { Timestamp } from '../generics/timestamps';
import { Session } from './session.entity';

@Entity('roleEnseignantSession')
@Index(["role", "enseignant", "session"], { unique: true })
export class RoleEnseignantSession extends Timestamp {
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
    }
  )
  @JoinColumn({ name: "enseignantId" })
  enseignant: Enseignant;

  @ManyToOne(
    () => Session,
    {
      primary: true,
      nullable: false,
    })
  @JoinColumn({ name: "sessionId" })
  session: Session;
}