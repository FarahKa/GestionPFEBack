import { IsNotEmpty } from "class-validator";

export class AffectSubjectToMentorDto {
    @IsNotEmpty()
    pfe_id: number;

    @IsNotEmpty()
    mentor_id: string;
}