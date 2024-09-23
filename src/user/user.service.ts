import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>){}

  async create(createUserDto: CreateUserDto) {

    let user:User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password, salt);
    user.password = password;
    user.role = 'user'
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({where:{id:id}});
  }

  findbyemail(email: string) {
    return this.userRepository.findOne({where:{email:email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user:User = new User();
    user.username = updateUserDto.username;
    user.id = id
  
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
