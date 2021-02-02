import { CreateAdminDto } from './../../dto/createAdmin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './../../../entities/admin.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) { }


    async findByCin(cin: string): Promise<Admin> {
        return await this.adminRepository.findOne({
            where: {
                cin: cin,
            }
        });
    }

    async create(admin: CreateAdminDto): Promise<Admin | void |{ status: number }> {

              const newAdmin = this.adminRepository.create();
              newAdmin.cin = admin.cin;
              newAdmin.firstname = admin.firstname;
              newAdmin.lastname=admin.lastname; 
              newAdmin.phoneNumber=admin.phoneNumber;
              
              return await this.adminRepository.save(newAdmin);                    

    }
}
