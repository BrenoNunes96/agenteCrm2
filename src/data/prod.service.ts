import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory{
createTypeOrmOptions():TypeOrmModuleOptions {
    return{
type:'postgres',
url:process.env.DATABASE_URL,
synchronize:true,
dropSchema:false,
ssl:{rejectUnauthorized:false},
logging:false,
autoLoadEntities:true   


    }
}


}
