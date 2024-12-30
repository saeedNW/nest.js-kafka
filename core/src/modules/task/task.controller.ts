import {
	Body,
	Controller,
	Get,
	Inject,
	OnModuleInit,
	Post,
	Req,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthDecorator } from "src/common/decorators/auth.decorator";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Request } from "express";
import { exceptionHandler } from "src/common/utilities/exception-handler.utility";
import { SwaggerConsumes } from "src/common/enums/swagger-consumes.enum";

@Controller("task")
@ApiTags("Task")
@AuthDecorator()
export class TaskController implements OnModuleInit {
	constructor(
		/** Inject Task microservice */
		@Inject("TASK_SERVICE")
		private readonly taskClientService: ClientKafka
	) {}

	/**
	 * On module initialization, subscribe to the response of
	 * the task microservice.
	 */
	async onModuleInit() {
		this.taskClientService.subscribeToResponseOf("create-task");
		this.taskClientService.subscribeToResponseOf("user-tasks");
		// Connect to task microservice
		await Promise.all([this.taskClientService.connect()]);
	}

	/**
	 * Creates a new task.
	 * @param {CreateTaskDto} createTaskDto - The data transfer object containing task creation details.
	 * @param {Request} request - The incoming request object.
	 */
	@Post()
	@ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
	async create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
		try {
			// Extract the user ID from the request object
			const { _id: userId } = request?.user;

			// Send the data to the task microservice create-task method
			const { task }: any = await new Promise((resolve, reject) => {
				this.taskClientService
					.send("create-task", { ...createTaskDto, userId })
					.subscribe(
						(data) => resolve(data),
						(error) => reject(error)
					);
			});

			return {
				message: "Task created successfully",
				task,
			};
		} catch (err) {
			exceptionHandler(err);
		}
	}

	/**
	 * Retrieves all tasks for the user.
	 * @param {Request} request - The incoming request object.
	 */
	@Get()
	async tasks(@Req() request: Request) {
		try {
			// Extract the user ID from the request object
			const { _id: userId } = request.user;
			// Send the user ID to the task microservice get-my-tasks method
			const newTaskResponse: any = await new Promise((resolve, reject) => {
				this.taskClientService.send("user-tasks", { userId }).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			return newTaskResponse;
		} catch (err) {
			exceptionHandler(err);
		}
	}
}
