import { Role } from '../../enums/role.enum';
import { IsNotEmpty } from "class-validator";



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


}