import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnneeScolaire } from 'src/entities/annee-scolaire.entity';
import { Etudiant } from 'src/entities/etudiant.entity';
import { Soutenance } from 'src/entities/soutenance.entity';
import { FiliereEnum } from 'src/enums/filere.enum';
import { CreateEtudiantDto } from 'src/etudiants/dto/createEtudiantDto';
import { UpdateEtudiantDto } from 'src/etudiants/dto/updateEtudiantDto';
import { Like, Repository } from 'typeorm';
@Injectable()
export class EtudiantService {
    constructor(
        
        @InjectRepository(Etudiant) 
        private etudiantRepository: Repository<Etudiant>,
        
        @InjectRepository(Soutenance)
        private soutenanceRepository: Repository<Soutenance>,

        @InjectRepository(AnneeScolaire)
        private AnneeScolaireRepository: Repository<AnneeScolaire>,
    ) {}

    async get_etudiant_by_id(student_id_number: number): Promise<Etudiant> {

        const etudiant = await this.etudiantRepository.findOne({student_id_number: student_id_number});
        return etudiant;

    }
    async get_etudiant_by_cin(cin: string): Promise<Etudiant> {
        return await this.etudiantRepository.findOne({cin: cin});
    }

    async create_etudiant(etudiant: CreateEtudiantDto) {
        const newEtudiant = this.etudiantRepository.create();
        let annee = await this.AnneeScolaireRepository.findOne({year: etudiant.year});
        newEtudiant.year = annee;
        newEtudiant.cin = etudiant.cin;
        newEtudiant.firstname = etudiant.firstname;
        newEtudiant.lastname = etudiant.lastname; 
        //newEtudiant.email = etudiant.email;
        newEtudiant.phoneNumber = etudiant.phoneNumber;
        newEtudiant.student_id_number = etudiant.student_id_number;
        newEtudiant.filiere = etudiant.filiere;
        return await this.etudiantRepository.save(newEtudiant)
    }

    async update_etudiant(student_id_number: number, idSoutenance: number): Promise<Etudiant>{
        let etudiant =  await this.etudiantRepository.findOne({
            student_id_number: student_id_number
            });
        let soutenance = await this.soutenanceRepository.findOne({id: idSoutenance});
        etudiant.soutenance = soutenance;
        return this.etudiantRepository.save(etudiant);
    }

    async delete_etudiant_by_id(student_id_number: number): Promise<void> {
        await this.etudiantRepository.delete(student_id_number);
    }
    async get_all_etudiants(): Promise<Etudiant[]> {
        return this.etudiantRepository.find();
    }

    async get_etudiant_by_filiere(filiere: FiliereEnum): Promise<Etudiant[]> {
        return this.etudiantRepository.find({filiere: filiere});

    }

    async get_etudiant_by_soutenance_id(soutenance_id: number): Promise<Etudiant> {
        
        let soutenance = await this.soutenanceRepository.findOne({id: soutenance_id});
        return this.etudiantRepository.findOne({soutenance: soutenance});   
    }
    
  
}

