import { ApiProperty } from "@nestjs/swagger";



export class CreateAttendanceDto {

    @ApiProperty()
    date:string;
    
    @ApiProperty()
    status:string;

}
