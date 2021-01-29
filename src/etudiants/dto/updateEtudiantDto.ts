import { IsNotEmpty } from "class-validator";
import { AnneeScolaire } from "src/entities/annee-scolaire.entity";
import { Soutenance } from "src/entities/soutenance.entity";
import { FiliereEnum } from "src/enums/filere.enum";
import { Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";

export class UpadateEtudiantDto {
    

    @IsNotEmpty()
    soutenance: Soutenance;


}