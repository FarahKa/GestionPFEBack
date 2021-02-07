import { AuthModule } from './../auth/auth.module';
import { Admin } from './../entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';


@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
