import { AdminModule } from './../admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { EtudiantsModule } from 'src/etudiants/etudiants.module';



@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: 'secret12356789'
    }),
    AdminModule,
    EtudiantsModule
    
    ],
    providers: [UserService, AuthService],
    controllers: [AuthController, UserController]
})
export class AuthModule { }
