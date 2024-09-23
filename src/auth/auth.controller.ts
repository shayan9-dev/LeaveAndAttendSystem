import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Req } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtservice:JwtService) {}

  @ApiTags('Login')
  @Post()
  @UseGuards(AuthGuard('local'))
  create(@Body(ValidationPipe) createAuthDto: CreateAuthDto,@Req() req) {
    let user:User = req.user ;

    const payload ={
      id:user.id,
      username:user.username,
      email:user.email,
      role:user.role
    }

    return this.jwtservice.sign(payload);
  }

  
}
