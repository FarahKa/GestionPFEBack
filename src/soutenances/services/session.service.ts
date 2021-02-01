import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import { Session } from '../../entities/session.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { Enseignant } from 'src/entities/enseignant.entity';
import { RoleEnseignantSession } from 'src/entities/role-enseignant-session.entity';
import { RoleEnseignantEnum } from 'src/enums/role-enseignant.enum';
import { PatchSessionDto } from '../dto/patch-session.dto';



@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Enseignant)
    private enseignantRepository: Repository<Enseignant>,
    @InjectRepository(RoleEnseignantSession)
    private roleSessionRepository: Repository<RoleEnseignantSession>
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

  async patchSession(id: number, data : any){
    //suppose data is new name or new start date or new end date or new president
    // console.log(new Date(data.start_date).getTimezoneOffset())
    // //data.start_date= data.start_date.toString().slice(0,10);
    // data.start_date = new Date(data.start_date + new Date(data.start_date).getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]
    // data.end_date= data.end_date.toString().slice(0,10);
    let session = await this.sessionRepository.findOne(id);
    if(data.name && data.name != ""){
      session.name = data.name;
    }
    if(data.start_date){
      console.log(data.start_date)
      console.log(session.start_date)
      session.start_date = data.start_date
      console.log("after start date")
    }
    if(data.end_date){
      session.end_date = data.end_date
    }
    if(data.president && data.president !== ""){
      let president = await this.enseignantRepository.findOne(data.president)
      let role = await this.roleSessionRepository.findOne({where:{role: RoleEnseignantEnum.president_session, session : session}, relations: ["enseignant", "session"]})
      if(!role){
        console.log("there is no president)")
      } else {
        await this.roleSessionRepository.remove(role);
      }
      role = new RoleEnseignantSession();
      role.role = RoleEnseignantEnum.president_session;
      role.session = session;
      role.enseignant = president;
      await this.roleSessionRepository.save(role);
    }

    return await this.sessionRepository.save(session)

  }

  async getPresident(id) : Promise<Enseignant>{
    let role = await this.roleSessionRepository.findOne({where : {
        session : {id:id}, role: RoleEnseignantEnum.president_session
      },
      relations: ["enseignant"]
    })
    if(role){
        return(role.enseignant)
    } else {
      return null
    }
  
    }
}
