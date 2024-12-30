import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as mongooseSchema } from "mongoose";

@Schema()
export class Token {
	@Prop({
		type: mongooseSchema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true,
	})
	userId: string;

	@Prop({ required: true })
	token: string;
}

export type tokenDocument = HydratedDocument<Token>;
export const TokenSchema = SchemaFactory.createForClass(Token);
