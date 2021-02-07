import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

export class ValidateInvalidateSubjectDto {
    @IsNotEmpty()
    @IsNumber()
    pfe_id: number;
}