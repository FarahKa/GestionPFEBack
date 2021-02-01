import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";

export class UpdatePFEDto {
    @IsOptional()
    @IsString()
    subject: string;

    @IsNotEmpty()
    student_id: string;
    
    @IsOptional()
    hosting_enterprise: string;
    
    //les encadrants
    @IsOptional()
    mentors_ids: string[];

    @IsNotEmpty()
    private: boolean;
}