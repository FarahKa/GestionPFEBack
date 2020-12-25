
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnseignantEnum } from 'src/enums/role-enseignant.enum';
import { Enseignant } from './enseignant.entity';
import { Timestamp } from '../generics/timestamps';
import { Session } from './session.entity';

@Entity('roleEnseignantSession')
export class RoleEnseignantSession extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      type: 'enum',
      enum: RoleEnseignantEnum,
      default: RoleEnseignantEnum.membre_jury
    }
  )
  status: RoleEnseignantEnum;

  @ManyToOne(
    type => Enseignant,
    (enseignant) => enseignant.id,
    {
      cascade: ['insert', 'update'],
      nullable: false,
      eager: true
    }
  )
  enseignant: Enseignant;

  @ManyToOne(
    type => Session,
    (session) => session.id,
    {
      cascade: ['insert', 'update'],
      nullable: false,
      eager: true
    }
  )
  session: Session;
}