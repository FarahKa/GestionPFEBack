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
  ) { }



  //   async createSoutenance(newSoutenance: CreateSoutenanceDto): Promise<Soutenance> {
  //     const soutenance = this.soutenanceRepository.create(newSoutenance);
  //     return await this.soutenanceRepository.save(soutenance);
  //   }
/*
  async createSoutenance(){
    const pfeEntity: PFE = this.pfeRepository.create();
        // set up e defaults
        pfeEntity.private= false
        pfeEntity.state =  PFEStateEnum.s1;
        pfeEntity.hosting_enterprise=""
        pfeEntity.subject=""
        pfeEntity.valid=false
        await this.pfeRepository.save(pfeEntity)
                                .then((data)=>{
                                    console.log(data)
                                })
  }
*/
  async affecterSession(idSession: number, idSoutenance: number): Promise<Soutenance> {
    const soutenance = await this.soutenanceRepository.findOne(idSoutenance);
    const session = await this.sessionRepository.findOne(idSession);

    soutenance.session = session;

    return await this.soutenanceRepository.save(soutenance)

  }

  findAll(): Promise<Soutenance[]> {
    return this.soutenanceRepository.find({ relations: ["pfe", "etudiant", "session"] });
  }

  findOne(id: string): Promise<Soutenance> {
    return this.soutenanceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.soutenanceRepository.delete(id);
  }
}
