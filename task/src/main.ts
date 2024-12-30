import { NestFactory } from "@nestjs/core";
import { TaskModule } from "./modules/task/task.module";
import { KafkaOptions, Transport } from "@nestjs/microservices";
import { ServiceExceptionFilter } from "./common/Filters/exception.filter";

async function bootstrap() {
	/**
	 * Initializes a microservice application using the `createMicroservice` method.
	 * This is required for setting up a microservice instead of a standard HTTP-based application.
	 */
	const app = await NestFactory.createMicroservice(TaskModule, {
		// Define microservice transport layer
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
	} as KafkaOptions);

	// initialize custom exception filter
	app.useGlobalFilters(new ServiceExceptionFilter());

	await app.listen();
	console.log("Task service is running");
}
bootstrap();