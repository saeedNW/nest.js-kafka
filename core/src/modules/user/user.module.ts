import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "USER_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "user", // Define kafka client ID
						brokers: ["localhost:29092"], // Define kafka broker
					},
					consumer: {
						groupId: "user-consumer", // Define kafka consumer group ID
					},
				},
			},
			{
				name: "TOKEN_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "token", // Define kafka client ID
						brokers: ["localhost:29092"], // Define kafka broker
					},
					consumer: {
						groupId: "token-consumer", // Define kafka consumer group ID
					},
				},
			},
		]),
	],
	controllers: [UserController],
	exports: [ClientsModule],
})
export class UserModule {}
