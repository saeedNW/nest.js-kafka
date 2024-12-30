import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as mongooseSchema } from "mongoose";
import { TaskStatus } from "../enum/task-status.enum";

@Schema({ timestamps: true })
export class Task {
	@Prop({ required: true })
	title: string;
	@Prop({ required: true })
	description: string;
	@Prop({ enum: TaskStatus })
	status: string;
	@Prop({
		type: mongooseSchema.Types.ObjectId,
		ref: "User",
		required: true,
	})
	userId: string;
}

export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);
