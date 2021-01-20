import { Body, Controller, Get, Post } from '@nestjs/common';
import { Session } from 'src/entities/session.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { CreateSessionDto } from 'src/soutenances/dto/create-session.dto';
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
}
