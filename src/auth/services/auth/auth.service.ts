import { EtudiantService } from 'src/etudiants/services/etudiant/etudiant.service';
import { AdminService } from 'src/admin/services/admin/admin.service';
import { LoginUserDto } from './../../dto/loginUser.dto';
import { User } from './../../../entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';
import * as crypto from 'crypto';
import { Role } from 'src/enums/role.enum';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService,
        private  readonly  etudiantService:  EtudiantService,
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
         let primary : any = {
            token: accessToken,
            cin: userData.cin,
            email: userData.email,
            role: userData.role,
         }
          switch (userData.role){
             case Role.Student : {
                await this.etudiantService.get_etudiant_by_cin(userData.cin).then(
                    (student)=>{
                       primary.firstname=student.firstname,
                       primary.lastname=student.lastname,
                       primary.phoneNumber=student.phoneNumber,
                       primary. student_id_number=student.student_id_number,
                       primary.filiere=student.filiere,
                       primary.year=student.year

                 })

                 break;
              }
              case Role.Teacher: {

                break;
             }
             case Role.Admin : {
                 await this.adminService.findByCin(userData.cin).then(
                     (admin)=>{
                        primary.firstname=admin.firstname,
                        primary.lastname=admin.lastname,
                        primary.phoneNumber=admin.phoneNumber

                  })
                                  
                break;
             }

          }

          return primary

        });
    }



}
