import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenController } from "./token.controller";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./schema/token.schema";

@Module({
	imports: [
		/** Initialize database connection */
		MongooseModule.forRoot("mongodb://127.0.0.1:27017/todo_microservice"),
		MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
	],
	controllers: [TokenController],
	providers: [TokenService, JwtService],
})
export class TokenModule {}
