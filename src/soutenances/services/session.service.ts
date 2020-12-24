import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import { SessionEntity } from '../entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  async createSession(newSession: CreateSessionDto): Promise<SessionEntity> {
    const session = this.sessionRepository.create(newSession);
    return await this.sessionRepository.save(session);
  }

  findAll(): Promise<SessionEntity[]> {
    return this.sessionRepository.find();
  }

  findOne(id: string): Promise<SessionEntity> {
    return this.sessionRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.sessionRepository.delete(id);
  }
}
