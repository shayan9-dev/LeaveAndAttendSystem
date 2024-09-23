import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query, UnauthorizedException } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { query } from 'express';


@ApiBearerAuth('jwt auth')
@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(AuthGuard('jwt'))
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post()
  async create(@Req() req) {
    return this.attendanceService.markAttendance(req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    if (req.user.role == 'admin') {
      return this.attendanceService.findAll();
    } else {
      throw new UnauthorizedException('You dont have access to this route')
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Get('/user/:userid')
  findbyuserid(@Param('userid') id: string) {
    return this.attendanceService.findbyuserid(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Get('/generate/reports')
  generatereports(@Query('from') fromdate: string, @Query('to') todate: string, @Req() req) {
    if (req.user.role == 'admin') {
      return this.attendanceService.generateReports(fromdate, todate)
    } else {
      throw new UnauthorizedException('You dont have access to this route')
    }
  }

  @Get('/generate/reports/:id')
  generatereportsbyid(@Param('id') id: number, @Query('from') fromdate: string, @Query('to') todate: string, @Req() req) {
    if (req.user.role == 'admin') {
      return this.attendanceService.generateReportsById(id, fromdate, todate)
    } else {
      throw new UnauthorizedException('You dont have access to this route')
    }

  }

  @Get('/calculategrade/:userid')
  calculategrade(@Param('userid') id: number) {
    return this.attendanceService.calculateattendance(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
