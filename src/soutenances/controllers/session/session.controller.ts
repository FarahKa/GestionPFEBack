import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionDto } from 'src/soutenances/dto/create-session.dto';
import { SessionEntity } from 'src/soutenances/entities/session.entity';
import { SessionService } from 'src/soutenances/services/session.service';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post("createSession")
    createSession(@Body() body: CreateSessionDto): Promise<SessionEntity> {
        return this.sessionService.createSession(body);
    }
}
