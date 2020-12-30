import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateSessionDto {
    @IsNotEmpty()
    @MaxLength(100)
    name : string;
    @IsNotEmpty()
    start_date : Date;
    @IsNotEmpty()
    end_date : Date;
}