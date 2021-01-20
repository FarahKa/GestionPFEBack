import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoutenanceDto } from '../dto/create-soutenance.dto';
import { Soutenance } from '../../entities/soutenance.entity';
import { Session } from 'src/entities/session.entity';
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * my dude 3andek getsession w get soutenance by pfeId to do
 * also fibeli some people get one soutenance date but mayal79ouch ykamlou
 * so they move the date l nahr e5er
 * so a3mel a thing ychangi e date
 * 
 * 
 * 
 * 
 * 
 * 
 */
@Injectable()
export class SoutenanceService {
  constructor(
    @InjectRepository(Soutenance)
    private soutenanceRepository: Repository<Soutenance>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    ) {}

  

//   async createSoutenance(newSoutenance: CreateSoutenanceDto): Promise<Soutenance> {
//     const soutenance = this.soutenanceRepository.create(newSoutenance);
//     return await this.soutenanceRepository.save(soutenance);
//   }

     async affecterSession(idSession : number, idSoutenance : number): Promise<Soutenance>{
      let soutenance = await this.soutenanceRepository.findOne(idSoutenance);
      let session = await this.sessionRepository.findOne(idSession);

      soutenance.session = session;

      return await this.soutenanceRepository.save(soutenance)

    }

  findAll(): Promise<Soutenance[]> {
    return this.soutenanceRepository.find({relations : ["pfe", "etudiant", "session"]});
  }

  findOne(id: string): Promise<Soutenance> {
    return this.soutenanceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.soutenanceRepository.delete(id);
  }
}
