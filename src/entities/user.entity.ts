import { Column, Entity, PrimaryColumn } from "typeorm";
import { Timestamp } from '../generics/timestamps';
// NE9ES AUTH STUFF

@Entity('utilisateur')
export class User extends Timestamp {
    @PrimaryColumn()
    cin: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: number;
}