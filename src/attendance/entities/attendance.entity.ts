import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('Attendance')
export class Attendance {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:string

    @Column({default:'Absent'})
    status:string

   
    @ManyToOne(()=>User,(user)=>user.attendance,{onDelete: 'SET NULL' })
    user:User

}
