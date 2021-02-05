import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnneeScolaire } from 'src/entities/annee-scolaire.entity';
import { Etudiant } from 'src/entities/etudiant.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { User } from 'src/entities/user.entity';
import { EtudiantController } from './controllers/etudiant/etudiant.controller';
import { EtudiantService } from './services/etudiant/etudiant.service';

@Module({
    controllers: [EtudiantController],
    providers: [EtudiantService],
    imports: [
      TypeOrmModule.forFeature([
        Etudiant, Soutenance, AnneeScolaire, User
      ])
    ],
    exports:[EtudiantService]
})
export class EtudiantsModule {}
