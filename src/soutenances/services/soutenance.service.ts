/* eslint-disable prefer-const */
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
import { PFE } from 'src/entities/pfe.entity';
import { Etudiant } from 'src/entities/etudiant.entity';
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
    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,
    @InjectRepository(RoleEnseignantSoutenance)
    private roleSoutenanceRepository: Repository<RoleEnseignantSoutenance>,
  ) { }





  //   async createSoutenance(newSoutenance: CreateSoutenanceDto): Promise<Soutenance> {
  //     const soutenance = this.soutenanceRepository.create(newSoutenance);
  //     return await this.soutenanceRepository.save(soutenance);
  //   }

  async createSoutenance(pfe: PFE) {
    const soutenanceEntity: Soutenance = this.soutenanceRepository.create();
    // set up e defaults
    soutenanceEntity.pfe = pfe
    return await this.soutenanceRepository.save(soutenanceEntity)
      .then((data) => {
        console.log("------------------------------------------")
        console.log(data)
        console.log("------------------------------------------")
        return data
      })
  }

  async affecterSession(idSession: number, idSoutenance: number): Promise<Soutenance> {
    const soutenance = await this.soutenanceRepository.findOne(idSoutenance);
    const session = await this.sessionRepository.findOne(idSession);

    soutenance.session = session;

    return await this.soutenanceRepository.save(soutenance)

  }


  findAll(): Promise<Soutenance[]> {
    return this.soutenanceRepository.find({
      relations: ['pfe', 'etudiant', 'session'],
    });
  }

  findOne(id: string): Promise<Soutenance> {
    return this.soutenanceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.soutenanceRepository.delete(id);
  }

  getAllProfessors(): Promise<Enseignant[]> {
    return this.enseignantRepository.find();
  }

  async getEncadrant(id): Promise<Enseignant> {
    let role = await this.roleSoutenanceRepository.findOne({
      where: {
        soutenance: { id: id },
        role: RoleEnseignantEnum.encadrant,
      },
      relations: ['enseignant'],
    });
    if (role) {
      return role.enseignant;
    } else {
      return null;
    }
  }

  async getJury(idSoutenance): Promise<Enseignant[]> {
    let soutenance = await this.soutenanceRepository.findOne(idSoutenance);
    let juryRoles = await this.roleSoutenanceRepository.find({
      where: { role: RoleEnseignantEnum.membre_jury, soutenance: soutenance },
      relations: ['enseignant'],
    });
    const jury: Enseignant[] = [];
    juryRoles.forEach(jureRole => {
      jury.push(jureRole.enseignant);
    });
    return jury;
  }
  async assignEncadrant(
    idSoutenance: number,
    idEnseignant: string,
  ): Promise<RoleEnseignantSoutenance> {
    const role = new RoleEnseignantSoutenance();
    role.enseignant = await this.enseignantRepository.findOne(idEnseignant);
    role.soutenance = await this.soutenanceRepository.findOne(idSoutenance);
    role.role = RoleEnseignantEnum.encadrant;
    return this.roleSoutenanceRepository.save(role);
  }

  async patchSoutenance(idSoutenance: number, data: any): Promise<Soutenance> {
    let soutenance = await this.soutenanceRepository.findOne(idSoutenance);
    if (data.session && data.session !== '') {
      let session = await this.sessionRepository.findOne(data.session);
      soutenance.session = session;
    }

    if (data.encadrant && data.encadrant !== '') {
      let encadrant = await this.enseignantRepository.findOne(data.encadrant);
      let role = await this.roleSoutenanceRepository.findOne({
        where: { role: RoleEnseignantEnum.encadrant, soutenance: soutenance },
        relations: ['enseignant', 'soutenance'],
      });
      if (!role) {
        console.log('there is no encadrant)');
      } else {
        await this.roleSoutenanceRepository.remove(role);
      }
      role = new RoleEnseignantSoutenance();
      role.role = RoleEnseignantEnum.encadrant;
      role.soutenance = soutenance;
      role.enseignant = encadrant;
      await this.roleSoutenanceRepository.save(role);
    }
    if (data.jury && data.jury !== [] && data.jury !== '') {
      let jury = await this.roleSoutenanceRepository.find({
        where: { role: RoleEnseignantEnum.membre_jury, soutenance: soutenance },
        relations: ['enseignant', 'soutenance'],
      });
      console.warn('old jury:');
      console.warn(jury);
      for (let prof of jury) {
        await this.roleSoutenanceRepository.remove(prof);
      }
      data.jury.forEach(async profCIN => {
        let role = new RoleEnseignantSoutenance();
        role.enseignant = await this.enseignantRepository.findOne(profCIN);
        role.soutenance = soutenance;
        role.role = RoleEnseignantEnum.membre_jury;
        await this.roleSoutenanceRepository.save(role);
      });
    }
    if (data.date && data.date !== '') {
      soutenance.date = data.date;
    }
    return this.soutenanceRepository.save(soutenance);
  }

  async getRogueSoutenances(): Promise<Soutenance[]> {
    let soutenances = await this.soutenanceRepository.find({
      relations: ['pfe', 'etudiant', 'session'],
    });
    soutenances = soutenances.filter(soutenance => soutenance.session === null);
    return soutenances;
  }

  async getSoutenanceByStudentId(studentId: number): Promise<Soutenance> {
    let student =await  this.etudiantRepository.findOne({student_id_number: studentId});
    return student.soutenance;

  }

  async getSoutenancesByFiliere(): Promise<any> {
    let soutenances: any[] = await this.soutenanceRepository.find({
      relations: ['pfe', 'etudiant', 'session'],
    });
    console.warn(soutenances);
    let filieres = [];

    for (let soutenance of soutenances) {
      soutenance.encadrant = await this.getEncadrant(soutenance.id);
      soutenance.jury = await this.getJury(soutenance.id);
      let filiere = filieres.find(
        filiere => filiere.nom === soutenance.etudiant.filiere,
      );
      if (filiere) {
        console.warn(filiere);
        filiere.soutenances.push(soutenance);
      } else {
        filiere = {
          nom: soutenance.etudiant.filiere,
          soutenances: [soutenance],
        };
        filieres.push(filiere);
        console.warn(filieres)
      }
    };
    console.warn("yo" + filieres);
    return filieres;
  }
}
