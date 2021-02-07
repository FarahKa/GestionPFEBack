import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";
import { PFEStateEnum } from "src/enums/pfe-state.enum";

export class UpdatePFEDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @IsOptional()
    @IsString()
    subject: string;
    
    @IsOptional()
    hosting_enterprise: string;
    
    //les encadrants
    @IsOptional()
    valid: boolean;

    @IsOptional()
    private: boolean;

    @IsString()
    @IsOptional()
    rapport: string; //link 

    @IsOptional()
    @IsEnum(PFEStateEnum)
    state: PFEStateEnum
}