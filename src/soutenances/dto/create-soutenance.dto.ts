import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateSoutenanceDto {
    @IsNotEmpty()
    date_time : Date;
    

}