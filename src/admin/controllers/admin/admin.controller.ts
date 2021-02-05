import { CreateAdminDto } from './../../dto/createAdmin.dto';
import { AdminService } from './../../services/admin/admin.service';
import { Controller, Body, Post } from '@nestjs/common';

@Controller('admin')

export class AdminController {
    constructor(private  readonly  adminService:  AdminService) {}
    
    @Post('register')
    async register(@Body() user:CreateAdminDto): Promise<any> {
      return this.adminService.create(user);
    }

}
