import { IsDefined, IsNotEmpty, MaxLength } from "class-validator";

export class PatchSoutenanceDto {
    @IsDefined()
    date : Date;
    @IsDefined()
    session : number;
    @IsDefined()
    encadrant : string;
    @IsDefined()
    jury : String | Array<String>

}