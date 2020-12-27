import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PFE } from 'src/entities/pfe.entity';
import { Repository } from 'typeorm';


/*
L'administrateur pourra valider ou invalider un sujet ajouté par un étudiant
L'administrateur pourra consulter la liste des sujets de pfe par année universitaire
L'administrateur pourra rechercher un pfe
L'administrateur pourra consulter un pfe (état, fichiers d'il y en a, encadreurs, juré, session et soutenance si programmées)
L'administrateur pourra affecter un sujet de pfe à un encadrant
*/
@Injectable()
export class PfeService {

    constructor(@InjectRepository(PFE) private pfeRepository: Repository<PFE>) { }

    validateSubject(){
        return true
    }

    invalidateSubject(){
        return true
    }
/*
    async getSubjectList(uni_year : int) : Promise<PFE[]> { //par année universitaire
        return await this.pfeRepository.find({
            where: [{ "year": uni_year }]
        });
    }
*/

    getPFEsBySubject(){
        return true
    }

    getPFEsByStudentID(){
        return true
    }

    getPFEsByHostingEnterprise(){
        return true
    }

    getPFEsByMentor(){
        return true
    }

    getPFEsByKeywords(){
        return true
    }

    affectSubjectToMentor(){
        return true
    }
}