import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SoutenancesModule } from './soutenances/soutenances.module';
import { PfeController } from './pfes/controllers/pfe/pfe.controller';
import { PfeService } from './pfes/services/pfe/pfe.service';
import { PfesModule } from './pfes/pfes.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      "dist/**/*.entity{.ts,.js}"
    ],
    synchronize: true,
    autoLoadEntities: true
  }), SoutenancesModule, PfesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}