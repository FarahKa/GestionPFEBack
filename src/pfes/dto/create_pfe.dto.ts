import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";

export class CreatePFEDto {
    @IsNotEmpty()
    etudiant: number;
    @IsDefined()
    encadrant: string;
    @IsDefined()
    entreprise : string;
    @IsDefined()
    sujet : string;
    @IsDefined()
    rapport : string;

}