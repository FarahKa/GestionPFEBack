import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateSessionDto } from 'src/soutenances/dto/create-session.dto';
import { Session } from 'src/entities/session.entity';
import { SessionService } from 'src/soutenances/services/session.service';
import { PatchSessionDto } from 'src/soutenances/dto/patch-session.dto';
import { Enseignant } from 'src/entities/enseignant.entity';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post("createSession")
    createSession(@Body() body: CreateSessionDto): Promise<Session> {
        return this.sessionService.createSession(body);
    }

    @Get("all")
    getAll() : Promise<Session[]>{
        return this.sessionService.findAll();
    }

    @Post("patchSession/:idSession")
    patchSoutenance(@Param('idSession', new ParseIntPipe()) idSession : number, @Body() session : PatchSessionDto): Promise<Session>{
        console.log(session)
        return this.sessionService.patchSession(idSession, session);
    }

    @Get("president/:idSession")
    getPresident(@Param('idSession', new ParseIntPipe()) idS) : Promise<Enseignant>{
     return this.sessionService.getPresident(idS);   
    }

    @Get(":idSession")
    getSessionById(@Param('idSession', new ParseIntPipe()) id) {
        return this.sessionService.findOne(id);
    }
}
