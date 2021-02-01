import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";

export class CreatePFEDto {
    @IsNotEmpty()
    student_id: number;
}