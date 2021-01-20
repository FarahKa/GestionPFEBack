import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import { Session } from '../../entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async createSession(newSession: CreateSessionDto): Promise<Session> {
    console.log("I gotcha")
    console.log(newSession)
    const session = this.sessionRepository.create(newSession);
    console.log(session)
    return await this.sessionRepository.save(session);
  }

  findAll(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  findOne(id: string): Promise<Session> {
    return this.sessionRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.sessionRepository.delete(id);
  }
}
