import { Controller } from "@nestjs/common";
import { TaskService } from "./task.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ICreateTask } from "./interfaces/create-task.interface";

@Controller()
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	/**
	 * Handles the "create-task" message pattern.
	 * @param {ICreateTask} createTaskDto - The data transfer object containing task creation details.
	 */
	@MessagePattern("create-task")
	create(@Payload() createTaskDto: ICreateTask) {
		return this.taskService.create(createTaskDto);
	}

	/**
	 * Handles the "get-my-tasks" message pattern.
	 * @param {string} userId - The ID of the user whose tasks are to be retrieved.
	 */
	@MessagePattern("user-tasks")
	get(@Payload() { userId }: { userId: string }) {
		return this.taskService.getList(userId);
	}
}
