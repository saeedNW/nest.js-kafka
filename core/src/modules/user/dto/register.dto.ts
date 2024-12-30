import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Expose()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	@Transform(({ value }) => value.toLowerCase())
	@Expose()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@Expose()
	password: string;
}
