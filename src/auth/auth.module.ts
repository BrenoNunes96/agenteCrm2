import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthController } from "./controllers/authController.controller";
import { LocalStrategy } from "./strategy/local-strategy.strategy";
import { AuthService } from "./service/authService.service";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { JwtStrategy } from "./strategy/jwtStrategy.strategy";


@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: "1h"},
        })

    ],
    controllers: [AuthController],
    providers: [Bcrypt, AuthService, LocalStrategy,JwtStrategy],
    exports: [Bcrypt],
})
export class AuthModule {};