import { IsNotEmpty, IsOptional } from "class-validator";
import { AnneeScolaire } from "src/entities/annee-scolaire.entity";
import { Soutenance } from "src/entities/soutenance.entity";
import { FiliereEnum } from "src/enums/filere.enum";
import { Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";

export class UpdateEtudiantDto {
    
    @IsOptional()
    cin: string;

    @IsOptional()
    firstname: string;

    @IsOptional()
    lastname: string;

    @IsOptional()
    phoneNumber: number;

    @IsOptional()
    student_id_number: number;

    @IsOptional()
    filiere: FiliereEnum;

    @IsOptional()
    year: number;

    @IsOptional()
    idSoutenance: number;


}