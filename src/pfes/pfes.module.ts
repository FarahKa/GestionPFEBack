import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enseignant } from 'src/entities/enseignant.entity';
import { Etudiant } from 'src/entities/etudiant.entity';
import { PFE } from 'src/entities/pfe.entity';
import { RoleEnseignantSoutenance } from 'src/entities/role-enseignant-soutenance.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { EtudiantsModule } from 'src/etudiants/etudiants.module';
import { EtudiantService } from 'src/etudiants/services/etudiant/etudiant.service';
import { SoutenanceService } from 'src/soutenances/services/soutenance.service';
import { SoutenancesModule } from 'src/soutenances/soutenances.module';
import { PfeController } from './controllers/pfe/pfe.controller';
import { PfeService } from './services/pfe/pfe.service';

@Module({
    controllers: [PfeController],
    providers: [PfeService],
    imports: [
      TypeOrmModule.forFeature([
        Etudiant, PFE, RoleEnseignantSoutenance, Soutenance, Enseignant
      ]),
      SoutenancesModule,
      EtudiantsModule
    ]
})
export class PfesModule {}
