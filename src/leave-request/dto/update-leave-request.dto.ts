import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveRequestDto } from './create-leave-request.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLeaveRequestDto extends PartialType(CreateLeaveRequestDto) {

    @ApiProperty()
    status: string;
}
