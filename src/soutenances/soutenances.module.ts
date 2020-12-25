import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './controllers/session/session.controller';
import { SoutenanceController } from './controllers/soutenance/soutenance.controller';
import { Session } from '../entities/session.entity';
import { SessionService } from './services/session.service';

@Module({
  controllers: [SessionController, SoutenanceController],
  providers: [SessionService],
  imports: [
    TypeOrmModule.forFeature([
      Session
    ])
  ]
})
export class SoutenancesModule {}
