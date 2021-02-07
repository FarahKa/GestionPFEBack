import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './controllers/session/session.controller';
import { SoutenanceController } from './controllers/soutenance/soutenance.controller';
import { Session } from '../entities/session.entity';
import { SessionService } from './services/session.service';
import { SoutenanceService } from './services/soutenance.service';
import { Soutenance } from 'src/entities/soutenance.entity';
import { Enseignant } from 'src/entities/enseignant.entity';
import { RoleEnseignantSoutenance } from 'src/entities/role-enseignant-soutenance.entity';
import { RoleEnseignantSession } from 'src/entities/role-enseignant-session.entity';
import { Etudiant } from 'src/entities/etudiant.entity';

@Module({
  controllers: [SessionController, SoutenanceController],
  providers: [SessionService, SoutenanceService],
  imports: [
    TypeOrmModule.forFeature([
      Session, Soutenance, Enseignant, RoleEnseignantSoutenance, RoleEnseignantSession, Etudiant
    ])
  ],
  exports: [ SoutenanceService ]
})
export class SoutenancesModule {}
