import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from 'src/entities/etudiant.entity';
import { PFE } from 'src/entities/pfe.entity';
import { PfeController } from './controllers/pfe/pfe.controller';
import { PfeService } from './services/pfe/pfe.service';

@Module({
    controllers: [PfeController],
    providers: [PfeService],
    imports: [
      TypeOrmModule.forFeature([
        Etudiant, PFE
      ])
    ]
})
export class PfesModule {}
