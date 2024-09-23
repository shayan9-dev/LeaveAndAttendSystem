import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeaveRequestModule } from './leave-request/leave-request.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true , envFilePath:['.local.env']}),TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configservice:ConfigService) =>({
        type:'postgres',
        host:configservice.get('DATABASE_HOST'),
        port:configservice.get('DATABASE_PORT'),
        username:configservice.get('DATABASE_USERNAME'),
        password:configservice.get('DATABASE_PASSWORD'),
        database:configservice.get('DATABASE_NAME'),
        synchronize:configservice.get('DATABASE_SYNC'),
        entities:[__dirname+'/**/*.entity{.js,.ts}']
    })
  }), UserModule, AuthModule, AttendanceModule, LeaveRequestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
