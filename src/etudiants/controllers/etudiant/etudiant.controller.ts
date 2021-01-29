import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Etudiant } from 'src/entities/etudiant.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { FiliereEnum } from 'src/enums/filere.enum';
import { CreateEtudiantDto } from 'src/etudiants/dto/createEtudiantDto';
import { EtudiantService } from 'src/etudiants/services/etudiant/etudiant.service';

@Controller('etudiant')
export class EtudiantController {
    constructor(private etudiantService: EtudiantService) {}

    @Get(":id")
    getEtudiantById(@Param('id') id: number): Promise<Etudiant>{
        return this.etudiantService.get_etudiant_by_id(id);

    }

    @Post("createEtudiant")
    createEtudiant(@Body() body: CreateEtudiantDto): Promise<Etudiant> {
        return this.etudiantService.create_etudiant(body);
    }

    @Put(":idEtudiant/:idSoutence")
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
    }
/*
    @Get(":filiere")
    getEtudiantsByFiliere(@Param('filiere') filiere: FiliereEnum):Promise<Etudiant[]> {
        return this.etudiantService.get_etudiant_by_filiere(filiere);
    }

    @Get(":soutenanceId")
    getEtudiantBySoutenanceId(@Param('soutenanceId') SoutenanceId: number): Promise<Etudiant> {
        return this.etudiantService.get_etudiant_by_soutenance_id(SoutenanceId);
    }
*/
}
