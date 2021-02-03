import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnneeScolaire } from 'src/entities/annee-scolaire.entity';
import { Etudiant } from 'src/entities/etudiant.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { EtudiantController } from './controllers/etudiant/etudiant.controller';
import { EtudiantService } from './services/etudiant/etudiant.service';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';
@Module({
    controllers: [EtudiantController],
    providers: [EtudiantService],
    imports: [
      TypeOrmModule.forFeature([
        Etudiant, Soutenance, AnneeScolaire
      ]),
      CsvModule,
      MulterModule.register({
        dest: './uploads',
      }),
    ],
    exports:[EtudiantService]
})
export class EtudiantsModule {}
