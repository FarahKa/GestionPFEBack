import { CreateUserDto } from '../../dto/createUser.dto';
import { Controller, Post, Body, Get, UseInterceptors, UploadedFiles } from  '@nestjs/common';
import { UserService } from './../../services/user/user.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { csvFileFilter, editFileName } from './../../../utils/file-upload.utils';

@Controller('users')
export class UserController {

    constructor(private  readonly  userService:  UserService) {}


    @Post('register')
    async register(@Body() user:CreateUserDto): Promise<any> {
      return this.userService.create(user);
    }
    @Post("import")
    @UseInterceptors(FilesInterceptor("files[]", 100, 
        {
            dest: './uploads',
            fileFilter: csvFileFilter
        }
    ) )
    importEtudiants(@UploadedFiles() files) {
       return this.userService.importEtudiants(files);
    }
/*
    @Get(":id")
    getEtudiantById(@Param('id') id: number): Promise<Etudiant>{
        return this.etudiantService.get_etudiant_by_id(id);

    }

    @Put(":idEtudiant")
    updateEtudiant(
            @Param('idEtudiant') idEtudiant: number,
            @Param('idSoutenance') idSoutenance: number): Promise<Etudiant>{
        return this.etudiantService.update_etudiant(idEtudiant, idSoutenance);
    }

    @Delete(":id")
    deleteEtudiant(@Param('id') id:number): Promise<void> {
        return this.etudiantService.delete_etudiant_by_id(id);
    }

    @Get("all")
    getAllEtudiants(): Promise<Etudiant[]> {
        return this.etudiantService.get_all_etudiants();
    }*/
}



