import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Expose()
	title: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Expose()
	description: string;
}
