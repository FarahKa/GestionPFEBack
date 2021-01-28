import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import { Session } from '../../entities/session.entity';
import { Soutenance } from 'src/entities/soutenance.entity';



@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async createSession(newSession: CreateSessionDto): Promise<Session> {
    const session = this.sessionRepository.create(newSession);
    return await this.sessionRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return this.sessionRepository
      .find({
        relations: ['soutenances', 'soutenances.etudiant', 'soutenances.pfe'],
      })
  }

  findOne(id: string): Promise<Session> {
    return this.sessionRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.sessionRepository.delete(id);
  }
}
