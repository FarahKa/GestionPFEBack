import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsDefined } from 'class-validator';
import { Enseignant } from 'src/entities/enseignant.entity';
import { Etudiant } from 'src/entities/etudiant.entity';
import { PFE } from 'src/entities/pfe.entity';
import { RoleEnseignantSoutenance } from 'src/entities/role-enseignant-soutenance.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { FiliereEnum } from 'src/enums/filere.enum';
import { PFEStateEnum } from 'src/enums/pfe-state.enum';
import { RoleEnseignantEnum } from 'src/enums/role-enseignant.enum';
import { EtudiantService } from 'src/etudiants/services/etudiant/etudiant.service';
import { CreatePFEDto } from 'src/pfes/dto/create_pfe.dto';
import { UpdatePFEDto } from 'src/pfes/dto/update_pfe.dto';
import { SoutenanceService } from 'src/soutenances/services/soutenance.service';
import { IsNull, Like, Not, Repository } from 'typeorm';

@Injectable()
export class PfeService {
  // NOTE : maybe add number of students fl uniyear bch ki nparcouri nnjame ncompari b
  // e number of students bch mandourech 3la e database lkol

  // NOTE : rakka7 l uppercase lowercase issue f e search

  //NOTE : make it stop ki yal9a wa7da

  // add an remove enseignant from list of metors of pfe

  constructor(
    @InjectRepository(PFE) private pfeRepository: Repository<PFE>,
    @InjectRepository(Etudiant) private studentRepository: Repository<Etudiant>,
    @InjectRepository(RoleEnseignantSoutenance)
    private roleEnsSoutRepository: Repository<RoleEnseignantSoutenance>,
    @InjectRepository(Soutenance)
    private soutenanceRepository: Repository<Soutenance>,
    @InjectRepository(Enseignant)
    private enseignantRepository: Repository<Enseignant>,
    private soutenanceService: SoutenanceService,
    private etudiantsService: EtudiantService,
  ) {}

  /* async insert(userDetails: CreateUserDto): Promise<UserEntity> {
         const userEntity: UserEntity = UserEntity.create();
         const {name } = userDetails;
         userEntity.name = name;
         await UserEntity.save(userEntity);
         return userEntity;
       }
 */

  async createPFE(body: CreatePFEDto): Promise<PFE | void> {
    //first create an empty pfe
    //then create an empty soutenance w assign l pfe to it
    //then assign l pfe ll student
    // {
    //     "etudiant": "51265959",
    //     "sujet": "aa",
    //     "entreprise": "aa",
    //     "rapport": "aa",
    //     "encadrant": "44444444"
    //   }

    let etudiant = await this.studentRepository.findOne({where : {cin :body.etudiant}});
    console.log(etudiant)
    let pfeEntity: PFE = this.pfeRepository.create();
    console.log(pfeEntity)
    // set up e defaults
    pfeEntity.private = false;
    pfeEntity.state = PFEStateEnum.s1;
    pfeEntity.hosting_enterprise = body.entreprise;
    pfeEntity.subject = body.sujet;
    pfeEntity.rapport = body.rapport;
    pfeEntity.valid = false;
    await this.pfeRepository.save(pfeEntity);
    console.log(pfeEntity)
    let soutenance = this.soutenanceRepository.create();
    soutenance.pfe = pfeEntity;
    await this.soutenanceRepository.save(soutenance);
    etudiant.soutenance = soutenance;
    await this.studentRepository.save(etudiant);
    if (body.encadrant && body.encadrant !== '') {
      let encadrant = await this.enseignantRepository.findOne(body.encadrant);
      let role = this.roleEnsSoutRepository.create();
      role.enseignant = encadrant;
      role.soutenance = soutenance;
      role.role = RoleEnseignantEnum.encadrant;
      await this.roleEnsSoutRepository.save(role);
    }
    return pfeEntity;

    // console.log("just created ml pfe here :")
    // console.log(data)
    // await this.soutenanceService.createSoutenance(data)
    //     .then(async (dat) => {
    //         console.log("just created e soutenance here :")
    //         console.log(dat)
    //         await this.etudiantsService.update_etudiant_given_soutenance(student_id, dat)
    //             .then((d) => {
    //                 console.log("assigned e thing ll etudiant : ")
    //                 console.log(d)
    //             })
    //     })

    //return await this.pfeRepository
  }

  //farah:this definitely works ama lezmek students with no soutenance w pfe fel database
  getStudentsNoPFE() {
    return this.studentRepository.find({ where: { soutenance: IsNull() } });
  }

  async deletePFE(pfe_id: string): Promise<void> {
    await this.pfeRepository.delete(pfe_id);
  }

  async updatePFE(new_pfe: UpdatePFEDto) {
    const pfe = await this.getPFEByID(new_pfe.id);
    if (new_pfe.hosting_enterprise)
      pfe.hosting_enterprise = new_pfe.hosting_enterprise;
    if (new_pfe.private) pfe.private = new_pfe.private;
    if (new_pfe.rapport) pfe.rapport = new_pfe.rapport;
    if (new_pfe.state) pfe.state = new_pfe.state;
    if (new_pfe.subject) pfe.subject = new_pfe.subject;
    if (new_pfe.valid) pfe.valid = new_pfe.valid;

    return await this.pfeRepository.save(pfe);
  }

  async validateOrInvalidateSubject(
    pfe_id: number,
    validate: boolean,
  ): Promise<boolean | undefined> {
    //par année universitaire
    return await this.pfeRepository
      .update(pfe_id, { valid: validate })
      .then(data => {
        return true;
      });
  }

  async getPFEByID(pfe_id: number) {
    return await this.pfeRepository.findOne({ id: pfe_id });
  }

  //if you want to get all pfes then just pass nothing as a parameter
  async get_PFEs_by_year_with_students_teachers(year: number | undefined) {
    const where = {soutenance : Not(IsNull())};
    if (year) {
      console.log('fl year');
      where['year'] = { year: year };
    }
    return await this.studentRepository
      .find({
        relations: ['soutenance', 'soutenance.pfe', 'year'],
        // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
        where: where,
      })
      .then(async students => {
          console.log(students)
        const data = students;
        for (let index = 0; index < students.length; index++) {
          // deleting the uncessary data
          // in order to send clean data to the front
          delete students[index].year;
          delete students[index].createdAt;
          delete students[index].updatedAt;
          delete students[index].deletedAt;
          if (
            students[index].soutenance !== null &&
            students[index].soutenance !== undefined
          ) {
            console.log(
              'student ' +
                students[index].firstname +
                students[index].lastname +
                ' has soutenance',
            );
            delete students[index].soutenance.createdAt;
            delete students[index].soutenance.updatedAt;
            delete students[index].soutenance.deletedAt;

            delete students[index].soutenance.pfe.createdAt;
            delete students[index].soutenance.pfe.updatedAt;
            delete students[index].soutenance.pfe.deletedAt;
          }

          // done
          if (
            students[index].soutenance !== null &&
            students[index].soutenance !== undefined
          ) {
            //should always be true
            await this.roleEnsSoutRepository
              .find({
                relations: ['enseignant', 'soutenance'],
                // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                where: [
                  {
                    soutenance: {
                      id: students[index].soutenance.id,
                    },
                    role: RoleEnseignantEnum.encadrant,
                  },
                ],
              })
              .then(profs => {
                students[index].soutenance['encadrants'] = profs.map(
                  p => p.enseignant,
                );
                students[index].soutenance['encadrants'].forEach(function(p) {
                  delete p.createdAt;
                  delete p.updatedAt;
                  delete p.deletedAt;
                });
              });
          }
        }
        return data;
      });
  }

  // not actual id. numero d'inscri
  // returns tableau mt3 all pfes mt3 l etudiant heka (in case mdoubel he's gonna have more than one pfe)
  async getPFEsByStudentID(
    student_id: string | undefined,
  ): Promise<PFE[] | undefined> {
    if (!student_id) return undefined;
    const where = {};
    const relations = ['soutenance', 'soutenance.pfe'];
    where['student_id_number'] = Like('%' + student_id + '%');

    return await this.studentRepository
      .find({
        relations: relations,
        // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
        where: where,
      })
      .then(students => {
        const pfes: PFE[] = [];
        for (let index = 0; index < students.length; index++) {
          if (students[index].soutenance)
            pfes.push(students[index].soutenance.pfe);
        }
        return pfes;
      });
  }

  async getPFEsByMentor(year: number, id: number) {
    const where = { year: { year: year } };
    return await this.studentRepository
      .find({
        relations: ['soutenance', 'soutenance.pfe', 'year'],
        where: where,
      })
      .then(async students => {
        const data = [];
        for (let index = 0; index < students.length; index++) {
          if (students[index].soutenance) {
            const yes = await this.roleEnsSoutRepository
              .find({
                relations: ['enseignant', 'soutenance'],
                // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                where: [
                  {
                    enseignant: {
                      cin: id,
                    },
                    soutenance: {
                      id: students[index].soutenance.id,
                    },
                    role: RoleEnseignantEnum.encadrant,
                  },
                ],
              })
              .then(prof => {
                if (prof.length != 0) {
                  return true;
                }
                return false;
              });
            if (yes) data.push(students[index].soutenance.pfe);
          }
        }
        return data;
      });
  }
  /*
        async getPFEsByMentorANDSubjectHostEntANDYearANDFiliere(mentor_id: string, subject: string | undefined, hosting_enterprise: string | undefined, year: number | undefined, filiere: FiliereEnum |undefined): Promise<PFE[] | undefined> { //par année universitaire
            const pfes: PFE[] = []
            if (year) {
                const where = { "year": { "year": year } }
                if(filiere){
                    where["filiere"]=filiere
                }
                return await this.studentRepository.find(
                    {
                        relations: ["soutenance", "soutenance.pfe", "year"],
                        // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                        where: where
                    }
                ).then(async (students) => {
                    const pfes: PFE[] = []
                    for (let index = 0; index < students.length; index++) {
                        if (students[index].soutenance) {
                            if (subject)
                                if (!students[index].soutenance.pfe.subject.includes(subject))
                                    continue;
                            if (hosting_enterprise)
                                if (!students[index].soutenance.pfe.hosting_enterprise.includes(hosting_enterprise))
                                    continue;
                            const yes = await this.roleEnsSoutRepository.find(
                                {
                                    relations: ["enseignant", "soutenance"],
                                    // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                                    where: [{
                                        "enseignant": {
                                            "cin": mentor_id
                                        },
                                        "soutenance": {
                                            "id": students[index].soutenance.id
                                        },
                                        "role": RoleEnseignantEnum.encadrant
                                    }]
                                }
                            ).then((prof) => {
                                if (prof.length != 0) {
                                    return true
                                }
                                return false
                            })
                            if (yes)
                                pfes.push(students[index].soutenance.pfe)
                        }
                    }
                    return pfes
                })
            } else {
                return await this.roleEnsSoutRepository.find(
                    {
                        relations: ["enseignant", "soutenance", "soutenance.pfe"],
                        // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                        where: [{
                            "enseignant": {
                                "cin": Like("%" + mentor_id + "%")
                            }
                        }]
                    }
                ).then((profs) => {
                    for (let index = 0; index < profs.length; index++) {
                        if (profs[index].soutenance) {
                            if (subject)
                                if (!profs[index].soutenance.pfe.subject.includes(subject))
                                    continue;
                            if (hosting_enterprise)
                                if (!profs[index].soutenance.pfe.hosting_enterprise.includes(hosting_enterprise))
                                    continue;
                            pfes.push(profs[index].soutenance.pfe)
                        }
                    }
                    return pfes
                })
            }
        }
    */

  async affectSubjectToMentor(mentor_id: string, pfe_id: number) {
    return await this.soutenanceRepository
      .findOne({
        relations: ['pfe'],
        where: {
          pfe: {
            id: pfe_id,
          },
        },
      })
      .then(async soutenance => {
        if (soutenance) {
          return await this.roleEnsSoutRepository
            .save({
              role: RoleEnseignantEnum.encadrant,
              enseignant: {
                cin: mentor_id,
              },
              soutenance: {
                id: soutenance.id,
              },
            })
            .then(() => {
              return true;
            });
        }
        return false;
      });
  }
}
