import { IsNotEmpty, IsOptional } from "class-validator";
import { AnneeScolaire } from "src/entities/annee-scolaire.entity";
import { Soutenance } from "src/entities/soutenance.entity";
import { FiliereEnum } from "src/enums/filere.enum";
import { Column, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";



export class CreateEtudiantDto{

    @IsNotEmpty()
    cin: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phoneNumber: number;

    @IsNotEmpty()
    student_id_number: number;

    @IsNotEmpty()
    filiere: FiliereEnum;

    @IsOptional()
    year: number;

}