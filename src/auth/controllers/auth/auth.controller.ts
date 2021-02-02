import { CreateUserDto } from '../../dto/createUser.dto';
import { User } from './../../../entities/user.entity';
import { Controller, Post, Body } from  '@nestjs/common';
import { AuthService } from './../../services/auth/auth.service';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';



@Controller('auth')
export class AuthController {
    constructor(private  readonly  authService:  AuthService) {}

    @Post('login')
    async login(@Body() user: LoginUserDto): Promise<any> {
      return this.authService.login(user);
    }  
    
}
