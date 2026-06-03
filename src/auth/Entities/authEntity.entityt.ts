import { ApiProperty } from "@nestjs/swagger"
import { Column } from "typeorm"


export class UsuarioLogin{
    @ApiProperty()
    public usuario!:string
    @ApiProperty()
    public senha!:string
}
