import { IsDefined, IsNotEmpty, MaxLength } from "class-validator";

export class PatchSessionDto {
    @IsDefined()
    start_date : Date;
    @IsDefined()
    end_date : Date;
    @IsDefined()
    name : string;
    @IsDefined()
    president : string;
}