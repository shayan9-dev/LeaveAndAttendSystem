import { forwardRef, Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Attendance,User]),forwardRef(()=>UserModule)],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
