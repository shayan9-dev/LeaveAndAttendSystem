import { Injectable } from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { Repository } from 'typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LeaveRequestService {

        constructor(@InjectRepository(LeaveRequest) private readonly leaverepo:Repository<LeaveRequest>,private userservice:UserService){}

  async create(userid:number,createLeaveRequestDto: CreateLeaveRequestDto) {
    let leave:LeaveRequest = new LeaveRequest();
    leave.fromdate = createLeaveRequestDto.fromdate;
    leave.todate = createLeaveRequestDto.todate;
    leave.status = createLeaveRequestDto.status;
    leave.user = await this.userservice.findOne(userid)
    return this.leaverepo.save(leave);
  }

  findAll() {
    return this.leaverepo.find();
  }

  findOne(id: number) {
    return this.leaverepo.findOne({where:{id:id}});
  }

  findbyuserid(userid:number){
    return this.leaverepo.findOne({relations:['user'],where:{user:{id:userid}}})
  }

  update(id: number, updateLeaveRequestDto: UpdateLeaveRequestDto) {
   
    let leave:LeaveRequest = new LeaveRequest();
    leave.status = updateLeaveRequestDto.status;
    leave.id = id;
    return this.leaverepo.save(leave);

  }

  remove(id: number) {
    return this.leaverepo.delete(id);
  }
}
