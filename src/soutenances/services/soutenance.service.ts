import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoutenanceDto } from '../dto/create-soutenance.dto';
import { Soutenance } from '../../entities/soutenance.entity';
import { Session } from 'src/entities/session.entity';
import { Enseignant } from 'src/entities/enseignant.entity';
import { RoleEnseignantSoutenance } from 'src/entities/role-enseignant-soutenance.entity';
import { totalmem } from 'os';
import { RoleEnseignantEnum } from 'src/enums/role-enseignant.enum';
import { profile } from 'console';
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
    @InjectRepository(Enseignant)
    private enseignantRepository: Repository<Enseignant>,
    @InjectRepository(RoleEnseignantSoutenance)
    private roleSoutenanceRepository: Repository<RoleEnseignantSoutenance>,
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

  getAllProfessors() : Promise<Enseignant[]> {
    return this.enseignantRepository.find();
  }

  async getEncadrant(id) : Promise<Enseignant>{
  let role = await this.roleSoutenanceRepository.findOne({where : {
      soutenance : {id:id}
    },
    relations: ["enseignant"]
  })
  return(role.enseignant)
  }

  async assignEncadrant(idSoutenance : number, idEnseignant : string) : Promise<RoleEnseignantSoutenance>{
    let role = new RoleEnseignantSoutenance();
    role.enseignant = await this.enseignantRepository.findOne(idEnseignant) ;
    role.soutenance = await this.soutenanceRepository.findOne(idSoutenance) ;
    role.role = RoleEnseignantEnum.encadrant;
    return this.roleSoutenanceRepository.save(role);   
  }

  async patchSoutenance(idSoutenance: number, data : any) : Promise<Soutenance> {
    // {
    //   "session": 2,
    //   "encadrant": "0750002",
    //   "jury": [
    //     "0750005",
    //     "0750003"
    //   ],
    //   "date": "2021-01-08"
    // }
    console.warn(data)
    let soutenance = await this.soutenanceRepository.findOne(idSoutenance)
    if(data.session && data.session !== ""){
      console.warn("in session", data.session)
      let session = await this.sessionRepository.findOne(data.session);
      soutenance.session = session;
    }

    //there is still a problem with changing encadrant & jury
    if(data.encadrant && data.encadrant !== ""){
      console.warn("in encadrant", data.encadrant)
      let encadrant = await this.enseignantRepository.findOne(data.encadrant)
      console.warn(encadrant)
      console.warn(soutenance)
      let role = await this.roleSoutenanceRepository.findOne({where:{role: RoleEnseignantEnum.encadrant, soutenance: soutenance}})
      console.warn(role)
      role.enseignant = encadrant;
      this.roleSoutenanceRepository.save(role);
    }
    if(data.jury && data.jury !== [] && data.jury !== ""){
      console.warn("in jury", data.jury)
      let jury = await this.roleSoutenanceRepository.find({where: {role:RoleEnseignantEnum.membre_jury, soutenance: soutenance}})
      jury.forEach((prof)=> {
        this.roleSoutenanceRepository.delete(prof);
      })
      data.jury.forEach(async (profCIN) => {
          let role = new RoleEnseignantSoutenance();
          role.enseignant = await this.enseignantRepository.findOne(profCIN)
          role.soutenance = soutenance;
          role.role = RoleEnseignantEnum.membre_jury;
          this.roleSoutenanceRepository.save(role);       
      })
    }
    if(data.date && data.date !== ""){
      console.warn("in date", data.date)
      soutenance.date = data.date;
    }
    console.log(soutenance)
    return this.soutenanceRepository.save(soutenance)

  } 
}
