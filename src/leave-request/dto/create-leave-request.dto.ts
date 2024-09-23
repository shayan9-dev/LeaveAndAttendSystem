import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsString } from "class-validator"




export class CreateLeaveRequestDto {

    @ApiProperty()
    @IsDateString()
    fromdate:string

    @ApiProperty()
    @IsDateString()
    todate:string

    @ApiProperty()
    @IsString()
    status:string
}
