import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserModule } from "../user/user.module";

@Module({
	imports: [
		UserModule,
		ClientsModule.register([
			{
				name: "TASK_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "task", // Define kafka client ID
						brokers: ["localhost:29092"], // Define kafka broker
					},
					consumer: {
						groupId: "task-consumer", // Define kafka consumer group ID
					},
				},
			},
		]),
	],
	controllers: [TaskController],
})
export class TaskModule {}
