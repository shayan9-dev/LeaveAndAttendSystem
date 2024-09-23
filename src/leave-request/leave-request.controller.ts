import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@ApiBearerAuth('jwt auth')
@ApiTags('Leave-request')
@UseGuards(AuthGuard('jwt'))
@Controller('leave-request')

export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  create(@Body() createLeaveRequestDto: CreateLeaveRequestDto,@Req() req) {
    let user:User = req.user;
    let userid:number = user.id
    return this.leaveRequestService.create(userid,createLeaveRequestDto);
  }

  @Get()
  findAll(@Req() req) {
    if(req.user.role == 'admin'){
      return this.leaveRequestService.findAll()
    }else{
      throw new UnauthorizedException('You dont have access to this route')
    }
   ;
  }

  @Get(':id')
  findOne(@Param('id') id: string , @Req() req) {
    if(req.user.role == 'admin'){
     return this.leaveRequestService.findOne(+id);
    }else{
      throw new UnauthorizedException('You dont have access to this route')
    }
    
  }

  @Get('/user/:userid')
  findbyuserid(@Param('userid') id: string) {
    return this.leaveRequestService.findbyuserid(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveRequestDto: UpdateLeaveRequestDto, @Req() req) {
    if(req.user.role == 'admin'){
      return this.leaveRequestService.update(+id, updateLeaveRequestDto);
    }else{
      throw new UnauthorizedException('You dont have access to this route')
    }
   
  }

  @Delete(':id')
  remove(@Param('id') id: string ,@Req() req) {
    if(req.user.role == 'admin'){
     return this.leaveRequestService.remove(+id);
    }else{
      throw new UnauthorizedException('You dont have access to this route')
    }
    
  }
}
