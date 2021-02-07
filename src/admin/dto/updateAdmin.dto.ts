import { Role } from '../../enums/role.enum';
import { IsNotEmpty, IsOptional } from "class-validator";



export class UpdateAdminDto{

    @IsNotEmpty()
    cin: string;

    @IsOptional()
    firstname: string;

    @IsOptional()
    lastname: string;

    @IsOptional()
    email: string;

    @IsOptional()
    phoneNumber: number;

    @IsOptional()
    password: string;

    @IsOptional()
    role: Role;


}