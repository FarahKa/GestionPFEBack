import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Enseignant } from 'src/entities/enseignant.entity';
import { Session } from 'src/entities/session.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { CreateSessionDto } from 'src/soutenances/dto/create-session.dto';
import { PatchSoutenanceDto } from 'src/soutenances/dto/patch-soutenance.dto';
import { SessionService } from 'src/soutenances/services/session.service';
import { SoutenanceService } from 'src/soutenances/services/soutenance.service';

@Controller('soutenance')
export class SoutenanceController {

    constructor(private sessionService: SessionService, private soutenanceService : SoutenanceService) {}

    @Post("affecterSession")
    affecterSession(@Body('idSession') idSession: number, @Body('idSoutenance') idSoutenance : number): Promise<Soutenance> {
        
        return this.soutenanceService.affecterSession(idSession, idSoutenance);
    }

    @Get("all")
    getAll() : Promise<Soutenance[]>{
        return this.soutenanceService.findAll();
    }

    @Get("allEnseignants")
    getAllProfessors() : Promise<Enseignant[]>{
        return this.soutenanceService.getAllProfessors();
    }

    @Get("encadrant/:id")
    getEncadrant(@Param('id') id: number): Promise<Enseignant>{
        return this.soutenanceService.getEncadrant(id);
    }

    @Get("assignEncadrant/:idS/:idEn")
    assignEncadrant(@Param('idS', new ParseIntPipe()) idSoutenance : number, @Param('idEn') idEnseignant : string) : any {
        console.warn("in controller")
        return this.soutenanceService.assignEncadrant(idSoutenance, idEnseignant);
    }

    @Post("patchSoutenance/:idSoutenance")
    patchSoutenance(@Param('idSoutenance', new ParseIntPipe()) idSoutenance : number, @Body() soutenance : PatchSoutenanceDto): Promise<Soutenance>{
        console.warn(idSoutenance, soutenance)
        return this.soutenanceService.patchSoutenance(idSoutenance, soutenance);
    }

    @Get("rogue")
    getRogueSoutenances() : Promise<Soutenance[]>{
        return this.soutenanceService.getRogueSoutenances()
    }
}
