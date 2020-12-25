import { Body, Controller, Post } from '@nestjs/common';
import { Session } from 'src/entities/session.entity';
import { CreateSessionDto } from 'src/soutenances/dto/create-session.dto';
import { SessionService } from 'src/soutenances/services/session.service';

@Controller('soutenance')
export class SoutenanceController {

    constructor(private sessionService: SessionService) {}

    @Post("affecterSession")
    createSession(@Body() body: CreateSessionDto): Promise<Session> {
        return this.sessionService.createSession(body);
    }
}
