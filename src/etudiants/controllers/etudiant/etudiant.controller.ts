import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Etudiant } from 'src/entities/etudiant.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { FiliereEnum } from 'src/enums/filere.enum';
import { CreateEtudiantDto } from 'src/etudiants/dto/createEtudiantDto';
import { UpdateEtudiantDto } from 'src/etudiants/dto/updateEtudiantDto';
import { EtudiantService } from 'src/etudiants/services/etudiant/etudiant.service';

@Controller('etudiants')
export class EtudiantController {
    constructor(private etudiantService: EtudiantService) {}

    @Get("all")
    getAllEtudiants(): Promise<Etudiant[]> {
        return this.etudiantService.get_all_etudiants();
    }

    @Get("etudiant/:id")
    getEtudiantById(@Param('id', new ParseIntPipe()) id: number) {
        return this.etudiantService.get_etudiant_by_id(id);

    }

    @Post("createEtudiant")
    createEtudiant(@Body() body: CreateEtudiantDto): Promise<Etudiant> {
        return this.etudiantService.create_etudiant(body);
    }

    @Put("update/:idEtudiant/:idSoutenance")
    updateEtudiant(
        @Param('idEtudiant', new ParseIntPipe()) idEtudiant: number,
        @Param('idSoutenance', new ParseIntPipe()) idSoutenance: number
        ): Promise<Etudiant>{
        return this.etudiantService.update_etudiant(idEtudiant, idSoutenance);
    }
    @Delete(":id")
    deleteEtudiant(@Param('id', new ParseIntPipe()) id:number): Promise<void> {
        return this.etudiantService.delete_etudiant_by_id(id);
    }

    @Get("filiere/:filiere")
    getEtudiantsByFiliere(@Param('filiere') filiere: FiliereEnum):Promise<Etudiant[]> {
        return this.etudiantService.get_etudiant_by_filiere(filiere);
    }

    @Get("soutenance/:soutenanceId")
    getEtudiantBySoutenanceId(@Param('soutenanceId', new ParseIntPipe()) SoutenanceId: number): Promise<Etudiant> {
        return this.etudiantService.get_etudiant_by_soutenance_id(SoutenanceId);
    }

}
