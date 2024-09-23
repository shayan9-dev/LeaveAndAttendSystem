import { Attendance } from "src/attendance/entities/attendance.entity";
import { LeaveRequest } from "src/leave-request/entities/leave-request.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('Users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    role: string

    @Column({nullable:true})
    grade:string


    @OneToMany(()=>Attendance,(atten)=>atten.user, { cascade: true, onDelete: 'CASCADE' })
    attendance:Attendance[]

    @OneToMany(()=>LeaveRequest,(leaveRequest)=>leaveRequest.user)
    leaverequest:LeaveRequest[]

}
