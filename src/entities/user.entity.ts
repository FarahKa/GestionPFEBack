import { Role } from './../enums/role.enum';
import { CONNREFUSED } from "dns";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Timestamp } from '../generics/timestamps';
import * as crypto from 'crypto';


@Entity('utilisateur')
export class User extends Timestamp {

   // @OneToOne(() => User,{eager: true,onDelete: 'CASCADE' })
    //@JoinColumn({ name: "cin" })
    @PrimaryColumn()
    cin: string;

    @Column()
    email: string;
    
    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');

    }
    @Column()
    password: string;

    @Column()
    role: Role;


}