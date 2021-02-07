import { UpdateAdminDto } from './../../dto/updateAdmin.dto';
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
              console.log(admin);
              const newAdmin = this.adminRepository.create();
              newAdmin.cin = admin.cin;
              newAdmin.firstname = admin.firstname;
              newAdmin.lastname=admin.lastname; 
              newAdmin.phoneNumber=admin.phoneNumber;
              
              return await this.adminRepository.save(newAdmin);                    

    }
    async update_admin(idAdmin :number,updateAdmin:UpdateAdminDto): Promise<Admin> {
        const admin = await this.findByCin(updateAdmin.cin);
        console.log("old admin",admin);
        if (admin)
     
      {
      if(updateAdmin.firstname)
      admin.firstname=updateAdmin.firstname;
      if(updateAdmin.lastname)
      admin.lastname=updateAdmin.lastname;
      if(updateAdmin.phoneNumber)
      admin.phoneNumber=updateAdmin.phoneNumber;
      return await this.adminRepository.save(admin);

    }
    else {

         throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);   
    }
        /*const user = await this.userService.findByCin(idAdmin.toString());
        /if(updateAdmin.email)
        user.email=updateAdmin.email;  
        await this.userRepository.save(admin);*/

       
    }
    async delete_admin_by_id(id:string): Promise<any> {
        return await  this.adminRepository.delete(id);
    }
    async getAllAdmins(): Promise<Admin[]> {
        return this.adminRepository.find();
      }

}
