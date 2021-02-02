import { Role } from '../../enums/role.enum';
import { IsNotEmpty, IsOptional } from "class-validator";
import { FiliereEnum } from 'src/enums/filere.enum';
import { DepEnum } from 'src/enums/departement.enum';



export class CreateUserDto{

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
    password: string;

    @IsNotEmpty()
    role: Role;

    @IsOptional()
    student_id_number: number;

    @IsOptional()
    filiere: FiliereEnum;

    @IsOptional()
    year: number;

    @IsOptional()
    departement: DepEnum;

}