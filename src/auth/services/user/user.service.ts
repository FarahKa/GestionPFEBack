import { EtudiantService } from 'src/etudiants/services/etudiant/etudiant.service';
import { Admin } from './../../../entities/admin.entity';
import { AdminService } from './../../../admin/services/admin/admin.service';
import { Role } from './../../../enums/role.enum';
import { CreateUserDto } from '../../dto/createUser.dto';
import { User } from './../../../entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { of, throwError } from 'rxjs';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private  readonly  adminService:  AdminService,
        private  readonly  etudiantService:  EtudiantService,
        //have to add student and teacher services 
    ) { }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email,
            }
        });
    }

    async findByCin(cin: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                cin: cin,
            }
        });
    }
    
    


    async create(user: CreateUserDto): Promise<User | Admin|void |{ status: number }> {

        return this.findByEmail(user.email).then(async(userData)=>{
            if(userData){
                throw new HttpException('adresse e-mail déjà utilisée ', HttpStatus.CONFLICT);
            }
            
            return this.findByCin(user.cin).then(async(userData)=>{
                if(userData){
                  throw new HttpException('carte d\'identité déjà utilisée ', HttpStatus.CONFLICT);
                }  
                const newUser = this.userRepository.create();
                newUser.cin = user.cin;
                newUser.email = user.email;
                newUser.password=user.password; 
                newUser.role=user.role;
                
                await this.userRepository.save(newUser);  

                switch (user.role){
                    case Role.Student : {

                        return this.etudiantService.create_etudiant(user);
       
                     }
                     case Role.Teacher: {
                       //to add
                       break;
                    }
                    case Role.Admin : {
                        return await this.adminService.create(user);
                    }
                }

                  
            })

        
        })
       
    }
    
    async importEtudiants(files): Promise<void> {

        const response = [];     
        var fs = require('fs');
        var csv = require('csv-parser');
        var newEtudiants: CreateUserDto []= [];

        await files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });


     await response.forEach(async file => {
            await fs.createReadStream("./uploads/"+ file.filename)
                .pipe(csv())
                .on('data', async function (data) {
                    try {

                       await newEtudiants.push(data);
                        
                    }
                    catch (err) {
                        //error handler
                       throw new HttpException('probleme lors de l\'importation', HttpStatus.BAD_REQUEST);    
                    }
                })
                .on('end', ()=> {   
                     newEtudiants.forEach( async etudiant => {
                        return this.create(etudiant);               
                    });
                })

        });

}
}
