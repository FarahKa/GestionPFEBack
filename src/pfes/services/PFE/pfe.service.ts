import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/entities/etudiant.entity';
import { PFE } from 'src/entities/pfe.entity';
import { RoleEnseignantSoutenance } from 'src/entities/role-enseignant-soutenance.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { RoleEnseignantEnum } from 'src/enums/role-enseignant.enum';
import { Like, Repository } from 'typeorm';


@Injectable()
export class PfeService {
    // NOTE : maybe add number of students fl uniyear bch ki nparcouri nnjame ncompari b 
    // e number of students bch mandourech 3la e database lkol

    // NOTE : rakka7 l uppercase lowercase issue f e search

    //NOTE : make it stop ki yal9a wa7da
    constructor(
        @InjectRepository(PFE) private pfeRepository: Repository<PFE>,
        @InjectRepository(Etudiant) private studentRepository: Repository<Etudiant>,
        @InjectRepository(RoleEnseignantSoutenance) private roleEnsSoutRepository: Repository<RoleEnseignantSoutenance>,
        @InjectRepository(Soutenance) private soutenanceRepository: Repository<Soutenance>
    ) { }

    async getPFEById(pfe_id: number) {
        return await this.pfeRepository.findOne(pfe_id)
    }

    async validateOrInvalidateSubject(pfe_id: number, validate: boolean): Promise<boolean | undefined> { //par année universitaire
        return await this.pfeRepository.update(
            pfe_id,
            { "valid": validate }
        ).then((data) => { return true })
    }

    async getPFEsBySubjectHostingEnterpriseOrYear(subject: string | undefined, hosting_enterprise: string | undefined, year: number | undefined): Promise<PFE[] | undefined> { //par année universitaire
        const where = {}
        if (year) {
            where["year"] = { "year": year }
            return await this.studentRepository.find(
                {
                    relations: ["soutenance", "soutenance.pfe", "year"],
                    // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                    where: where
                }
            ).then((students) => {
                const pfes: PFE[] = []
                for (let index = 0; index < students.length; index++) {
                    if (students[index].soutenance) {
                        if (subject)
                            if (!students[index].soutenance.pfe.subject.includes(subject))
                                continue;
                        if (hosting_enterprise)
                            if (!students[index].soutenance.pfe.hosting_enterprise.includes(hosting_enterprise))
                                continue;
                        pfes.push(students[index].soutenance.pfe)
                    }
                }
                return pfes
            })
        } else {
            if (subject)
                where["subject"] = Like("%" + subject + "%");
            if (hosting_enterprise)
                where["hosting_enterprise"] = Like("%" + hosting_enterprise + "%");
            return await this.pfeRepository.find(
                {
                    where: where
                }
            )
        }
    }

    //not actual id. numero d'inscri
    async getPFEsByStudentIDOrYear(student_id: string | undefined, uni_year: number | undefined): Promise<PFE[] | undefined> { //par année universitaire
        const where = {}
        const relations = ["soutenance", "soutenance.pfe"]
        if (student_id)
            where["student_id_number"] = Like("%" + student_id + "%");
        if (uni_year) {
            where["year"] = { "year": uni_year }
            relations.push("year")
        }
        if (!uni_year && !student_id)
            return undefined
        return await this.studentRepository.find(
            {
                relations: relations,
                // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                where: where
            }
        ).then((students) => {
            const pfes: PFE[] = []
            for (let index = 0; index < students.length; index++) {
                if (students[index].soutenance)
                    pfes.push(students[index].soutenance.pfe)
            }
            return pfes
        })
    }


    async getPFEsByMentorANDSubjectHostEntOrYear(mentor_id: string, subject: string | undefined, hosting_enterprise: string | undefined, year: number | undefined): Promise<PFE[] | undefined> { //par année universitaire
        const pfes: PFE[] = []
        if (year) {
            return await this.studentRepository.find(
                {
                    relations: ["soutenance", "soutenance.pfe", "year"],
                    // we can just give partie ml num d 'incri w houwa ytalla3 l possible stuff
                    where: { "year": { "year": year } }
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

    async affectSubjectToMentor(mentor_id: string, pfe_id: number) {
        return await this.soutenanceRepository.findOne({
            relations: ["pfe"],
            where: {
                "pfe": {
                    "id": pfe_id
                }
            }
        }).then(async (soutenance) => {
            if (soutenance) {
                return await this.roleEnsSoutRepository.save(
                    {
                        role: RoleEnseignantEnum.encadrant,
                        enseignant: {
                            "cin": mentor_id,
                        },
                        soutenance: {
                            "id": soutenance.id
                        }
                    }
                ).then(() => {
                    return true
                })

            }
            return false
        })
    }
}