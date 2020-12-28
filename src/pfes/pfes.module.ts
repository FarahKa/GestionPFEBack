import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from 'src/entities/etudiant.entity';
import { PFE } from 'src/entities/pfe.entity';
import { RoleEnseignantSoutenance } from 'src/entities/role-enseignant-soutenance.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { PfeController } from './controllers/pfe/pfe.controller';
import { PfeService } from './services/pfe/pfe.service';

@Module({
    controllers: [PfeController],
    providers: [PfeService],
    imports: [
      TypeOrmModule.forFeature([
        Etudiant, PFE, RoleEnseignantSoutenance, Soutenance
      ])
    ]
})
export class PfesModule {}
