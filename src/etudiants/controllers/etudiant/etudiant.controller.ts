import { csvFileFilter, editFileName } from './../../../utils/file-upload.utils';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Etudiant } from 'src/entities/etudiant.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { FiliereEnum } from 'src/enums/filere.enum';
import { CreateEtudiantDto } from 'src/etudiants/dto/createEtudiantDto';
import { UpdateEtudiantDto } from 'src/etudiants/dto/updateEtudiantDto';
import { EtudiantService } from 'src/etudiants/services/etudiant/etudiant.service';

@Controller('etudiants')
export class EtudiantController {
    constructor(private etudiantService: EtudiantService) { }

    @Get("all")//works
    getAllEtudiants(): Promise<Etudiant[]> {
        return this.etudiantService.get_all_etudiants();
    }

    @Get("etudiant/:id")//works
    getEtudiantById(@Param('id', new ParseIntPipe()) id: number) {
        return this.etudiantService.get_etudiant_by_id(id);

    }

    @Post("createEtudiant")//replaces instead
    createEtudiant(@Body() body: CreateEtudiantDto): Promise<Etudiant> {
        return this.etudiantService.create_etudiant(body);
    }

    @Put("update/:idEtudiant/:idSoutenance")//works
    updateEtudiant(
        @Param('idEtudiant', new ParseIntPipe()) idEtudiant: number,
        @Param('idSoutenance', new ParseIntPipe()) idSoutenance: number
    ): Promise<Etudiant> {
        return this.etudiantService.update_etudiant(idEtudiant, idSoutenance);
    }
    @Delete(":id")
    deleteEtudiant(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.etudiantService.delete_etudiant_by_id(id);
    }


    @Get("filiere/:filiere")//works
    getEtudiantsByFiliere(@Param('filiere') filiere: FiliereEnum):Promise<Etudiant[]> {
        return this.etudiantService.get_etudiant_by_filiere(filiere);
    }

    @Get("soutenance/:soutenanceId")//works
    getEtudiantBySoutenanceId(@Param('soutenanceId', new ParseIntPipe()) SoutenanceId: number): Promise<Etudiant> {
        return this.etudiantService.get_etudiant_by_soutenance_id(SoutenanceId);
    }

    @Post("import")
    @UseInterceptors(FilesInterceptor("files[]", 100, 
        {
            dest: './uploads',
            fileFilter: csvFileFilter
        }
    ) )
    importEtudiants(@UploadedFiles() files) {
       return this.etudiantService.importEtudiants(files);
    }
}
