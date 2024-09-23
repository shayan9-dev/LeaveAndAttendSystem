import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('Leave-Request')
export class LeaveRequest {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fromdate:string;

    @Column()
    todate:string;

    @Column({default:'pending'})
    status:string;

    @ManyToOne(()=>User,(user)=>user.leaverequest)
    user:User

}
