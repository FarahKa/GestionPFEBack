import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './controllers/session/session.controller';
import { SoutenanceController } from './controllers/soutenance/soutenance.controller';
import { Session } from '../entities/session.entity';
import { SessionService } from './services/session.service';
import { SoutenanceService } from './services/soutenance.service';
import { Soutenance } from 'src/entities/soutenance.entity';

@Module({
  controllers: [SessionController, SoutenanceController],
  providers: [SessionService, SoutenanceService],
  imports: [
    TypeOrmModule.forFeature([
      Session, Soutenance
    ])
  ]
})
export class SoutenancesModule {}
