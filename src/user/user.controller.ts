import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly authservice:AuthService) {}

  @Post()
 async create(@Body( ValidationPipe) createUserDto: CreateUserDto) {
    let user:User = await this.userService.create(createUserDto);
    const payload ={
      id:user.id,
      username:user.username,
      email:user.email,
      role:user.role
    }

    return this.authservice.generateToken(payload)
  }

  @ApiBearerAuth('jwt auth')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    if(req.user.role == 'admin'){
      return this.userService.findAll();
    }else{
      throw new UnauthorizedException('You dont have access to this route')
    }
    
  }

  @ApiBearerAuth('jwt auth')
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string,@Req() req) {
     return this.userService.findOne(+id);
   
    
  }

  @ApiBearerAuth('jwt auth')
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth('jwt auth')
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
