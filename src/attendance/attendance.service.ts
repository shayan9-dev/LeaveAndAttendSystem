import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Between, ILike, Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AttendanceService {

  constructor(@InjectRepository(Attendance) private readonly AttendanceRepo: Repository<Attendance>, private userservice:UserService,@InjectRepository(User) private userRepository:Repository<User> ) {
  }

  async markAttendance(userId: number): Promise<Attendance> {
    const today = new Date().toISOString().split('T')[0];
    const existingAttendance = await this.AttendanceRepo.findOne({ where: { user: { id: userId }, date: today } });

    if (existingAttendance) {
      throw new BadRequestException('Attendance already marked for today.');
    }

  let atted:Attendance = new Attendance()
  atted.date = today
  atted.status = 'Present'
  atted.user = await this.userservice.findOne(userId) 
    return this.AttendanceRepo.save(atted);
  }

  findAll() {
    return this.AttendanceRepo.find();
  }

  findOne(id: number) {
    return this.AttendanceRepo.findOne({ where: { id: id } });
  }

  async findbyuserid(userid: number) {
    return await this.AttendanceRepo.find({relations:['user'],where:{user:{id: userid}}})
  }


  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {

    let atten: Attendance = new Attendance();
    atten.status = updateAttendanceDto.status
    atten.id = id
    return this.AttendanceRepo.save(atten);
  }


  remove(id: number) {
    return this.AttendanceRepo.delete(id);
  }

  generateReports(fromdate:string,todate:string){
        return this.AttendanceRepo.find({where:{date:Between(fromdate , todate)},relations:['user']})
  }

 async generateReportsById(id: number, fromdate: string, todate: string) {
    return this.AttendanceRepo.find({
        where: {
            user: await this.userservice.findOne(id), 
            date: Between(fromdate, todate),
        },
        relations: ['user'],
    });
}

async calculateattendance(userid:number){
  const attendancecout = await this.AttendanceRepo.find({ relations: ['user'],
    where: { user: { id: userid },status :ILike('present') }})
  
    console.log(attendancecout)
  const attendance = attendancecout.length;
  console.log(attendance)
  let grade : string

  if (attendance >= 26) {
    grade = 'A';
  } else if (attendance >= 20) {
    grade = 'B';
  } else if (attendance >= 15) {
    grade = 'C';
  } else if (attendance >= 10) {
    grade = 'D';
  } else {
    grade = 'F';
  }
  const user:User = await this.userservice.findOne(userid);
    user.grade = grade;
    await this.userRepository.save(user);

    return { userid, grade };
}

}
