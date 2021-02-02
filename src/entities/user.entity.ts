import { Role } from './../enums/role.enum';
import { CONNREFUSED } from "dns";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { Timestamp } from '../generics/timestamps';
import * as crypto from 'crypto';


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
    
    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');

    }
    @Column()
    password: string;

    @Column()
    role: Role;


}