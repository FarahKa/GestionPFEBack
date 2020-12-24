import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session/session.controller';
import { SoutenanceController } from './controllers/soutenance/soutenance.controller';

@Module({
  controllers: [SessionController, SoutenanceController]
})
export class SoutenancesModule {}
