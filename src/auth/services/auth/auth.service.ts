import { LoginUserDto } from './../../dto/loginUser.dto';
import { CreateUserDto } from '../../dto/createUser.dto';
import { User } from './../../../entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    private async validate(userData: LoginUserDto): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    private async comparePasswords(sentPassword,dbPassword){
        sentPassword=crypto.createHmac('sha256', sentPassword).digest('hex');
        return sentPassword===dbPassword;

    }

    public async login(user: LoginUserDto): Promise< any | { status: number }>{
        return this.validate(user).then(async (userData)=>{
          if(!userData){
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
          }
      const areEqual = await this.comparePasswords(user.password, userData.password);
    
         if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
         }

          let payload = `${userData.email}${userData.cin}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             token: accessToken,
             cin: userData.cin,
             email: userData.email,
             firstname: userData.firstname,
             lastname: userData.lastname,
             phoneNumber:userData.phoneNumber,
             role:userData.role

          };

        });
    }



}
