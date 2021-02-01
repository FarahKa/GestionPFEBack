import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SoutenancesModule } from './soutenances/soutenances.module';
import { PfesModule } from './pfes/pfes.module';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { EtudiantsModule } from './etudiants/etudiants.module';

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
      "dist/**/*.entity{.ts,.js}",
      "*.entity{.ts,.js}"
    ],
    synchronize: false,
    autoLoadEntities: true
  }), SoutenancesModule, PfesModule, EtudiantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer : MiddlewareConsumer) : any {
    consumer.apply(HelmetMiddleware).forRoutes('');
  }
}