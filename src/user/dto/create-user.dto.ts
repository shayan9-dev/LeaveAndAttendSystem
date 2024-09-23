import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"



export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string


}
