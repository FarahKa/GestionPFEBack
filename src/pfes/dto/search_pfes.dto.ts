import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";
import { FiliereEnum } from "src/enums/filere.enum";

/* maybe add search by e names too*/
export class SearchPFEsDto {
    @IsOptional()
    @IsString()
    subject: string;

    @IsOptional()
    student_id: string;
    
    @IsOptional()
    hosting_enterprise: string;
    
    @IsOptional()
    @IsEnum(FiliereEnum)
    filiere: FiliereEnum;
    
    @IsOptional()
    mentor_id: string;
    
    @IsOptional()
    keywords: string; //seperated by ; 
    
    @IsOptional()
    @IsNumber()
    uni_year: number;

    //@IsNotEmpty() // add l faza hedhi later
    include_oldies: boolean;
}