import { IsNotEmpty, MaxLength } from "class-validator";

export class ValidateInvalidateSubjectDto {
    @IsNotEmpty()
    pfe_id: number;
}