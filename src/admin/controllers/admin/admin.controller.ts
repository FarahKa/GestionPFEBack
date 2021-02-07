import { UpdateAdminDto } from './../../dto/updateAdmin.dto';
import { Admin } from './../../../entities/admin.entity';
import { CreateAdminDto } from './../../dto/createAdmin.dto';
import { AdminService } from './../../services/admin/admin.service';
import { Controller, Body, Post, Put, ParseIntPipe, Param, Delete, Get } from '@nestjs/common';

@Controller('admin')

export class AdminController {
    constructor(private  readonly  adminService:  AdminService) {}
    
    @Post('register')
    async register(@Body() user:CreateAdminDto): Promise<any> {
      return this.adminService.create(user);
    }
    
    @Put("update/:idAdmin")//works
    updateAdmin(
        @Param('idAdmin', new ParseIntPipe()) idAdmin: number,
        @Body() admin: UpdateAdminDto
    ): Promise<Admin> {
        return this.adminService.update_admin(idAdmin,admin);
    }

    @Delete("delete/:id")
    deleteAdmin(@Param('id') id: string): Promise<any> {
      return this.adminService.delete_admin_by_id(id);
    }

    @Get("all")
    getAll() : Promise<Admin[]>{
        return this.adminService.getAllAdmins();
    }

    @Get(":id")
    getAdminById(@Param('id') id: string) {
        return this.adminService.findByCin(id);
    }

}
