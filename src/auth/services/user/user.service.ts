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

    async create(user: CreateUserDto): Promise<User | void |{ status: number }> {

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
              newUser.firstname = user.firstname;
              newUser.lastname = user.lastname;
              newUser.email = user.email;
              newUser.phoneNumber = user.phoneNumber;
              newUser.password=user.password; 
              newUser.role=user.role;
              
              return await this.userRepository.save(newUser);                    
            })

        
        })
       
    }


}
