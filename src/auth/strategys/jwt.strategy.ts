import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly configservice:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:true,
            secretOrKey:configservice.get('JWT_SECRET')
        })
    }

    validate(payload:any){
            return{
                id:payload.id,
                username:payload.username,
                email:payload.email,
                role:payload.role
            }
    }

}