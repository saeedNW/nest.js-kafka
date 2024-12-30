import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./schema/task.schema";
import { Model } from "mongoose";
import { ICreateTask } from "./interfaces/create-task.interface";
import { TaskStatus } from "./enum/task-status.enum";

@Injectable()
export class TaskService {
	constructor(
		// Inject the Task model
		@InjectModel(Task.name)
		private taskModel: Model<TaskDocument>
	) {}

	/**
	 * Creates a new task with the provided details.
	 * @param {ICreateTask} createTaskDto - The data transfer object containing task creation details.
	 */
	async create(createTaskDto: ICreateTask) {
		// Create a new task
		const task = await this.taskModel.create({
			...createTaskDto,
			status: TaskStatus.PENDING,
		});

		return {
			message: "Task created successfully",
			task,
		};
	}

	/**
	 * Retrieves all tasks for the user with the provided ID.
	 * @param {string} userId - The ID of the user whose tasks are to be retrieved.
	 */
	async getList(userId: string) {
		// Retrieve all tasks for the user
		return await this.taskModel.find({ userId });
	}
}
