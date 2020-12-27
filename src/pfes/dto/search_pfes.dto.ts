import { IsNotEmpty, MaxLength } from "class-validator";

/* maybe add search by e names too*/
export class SearchPFEsDto {
    subject : string;
    student_id : string;
    hosting_enterprise : string;
    mentor_id : string;
    keywords : string; //seperated by ; 
    
    @IsNotEmpty()
    include_oldies : boolean;
}