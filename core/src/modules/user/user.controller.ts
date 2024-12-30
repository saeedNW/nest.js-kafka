import {
	Body,
	Controller,
	Get,
	Inject,
	OnModuleInit,
	Post,
	Query,
	Req,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/enums/swagger-consumes.enum";
import { RegisterDto } from "./dto/register.dto";
import { exceptionHandler } from "src/common/utilities/exception-handler.utility";
import { LoginDto } from "./dto/login.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { AuthDecorator } from "src/common/decorators/auth.decorator";
import { Request } from "express";

@Controller("user")
@ApiTags("User")
export class UserController implements OnModuleInit {
	constructor(
		/** Inject user microservice */
		@Inject("USER_SERVICE")
		private userClientService: ClientKafka,

		/** Inject token microservice */
		@Inject("TOKEN_SERVICE")
		private tokenClientService: ClientKafka
	) {}

	/**
	 * On module initialization, subscribe to the response of
	 * the user and token microservices.
	 */
	async onModuleInit() {
		// Subscribe to the response of the user microservice
		this.userClientService.subscribeToResponseOf("register");
		this.userClientService.subscribeToResponseOf("login");
		this.userClientService.subscribeToResponseOf("find-all");
		// Subscribe to the response of the token microservice
		this.tokenClientService.subscribeToResponseOf("create-token");
		this.tokenClientService.subscribeToResponseOf("destroy-token");
		// Connect to user and token microservices
		await Promise.all([
			this.userClientService.connect(),
			this.tokenClientService.connect(),
		]);
	}

	/**
	 * Registers a new user.
	 * @param {RegisterDto} registerDto - The data transfer object containing user registration details.
	 */
	@Post("register")
	@ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
	async register(@Body() registerDto: RegisterDto) {
		try {
			// Send the data to the user microservice register method
			const { userId }: any = await new Promise((resolve, reject) => {
				this.userClientService.send("register", registerDto).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			// Send the user ID to the token microservice create-token method
			const { token }: any = await new Promise((resolve, reject) => {
				this.tokenClientService.send("create-token", { userId }).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			return {
				message: "User account created successfully",
				token,
			};
		} catch (error) {
			exceptionHandler(error);
		}
	}

	/**
	 * Logs in a user.
	 * @param {LoginDto} loginDto - The data transfer object containing user login details.
	 */
	@Post("login")
	@ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
	async login(@Body() loginDto: LoginDto) {
		try {
			// Send the data to the user microservice register method
			const { userId }: any = await new Promise((resolve, reject) => {
				this.userClientService.send("login", loginDto).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			// Send the user ID to the token microservice create-token method
			const { token }: any = await new Promise((resolve, reject) => {
				this.tokenClientService.send("create-token", { userId }).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			return {
				message: "User logged in successfully",
				token,
			};
		} catch (err) {
			exceptionHandler(err);
		}
	}

	/**
	 * Retrieves all users.
	 * @param {PaginationDto} paginationDto - The pagination data transfer object.
	 */
	@Get()
	@AuthDecorator()
	async findAll(@Query() paginationDto: PaginationDto) {
		try {
			// Send the data to the user microservice find-all method
			const data: any = await new Promise((resolve, reject) => {
				this.userClientService.send("find-all", paginationDto).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			return data;
		} catch (err) {
			exceptionHandler(err);
		}
	}

	/**
	 * Logs out the user by destroying their token.
	 * @param {Request} request - The request object containing the user's information.
	 */
	@Get("logout")
	@AuthDecorator()
	async logout(@Req() request: Request) {
		try {
			// Destructure the user ID from the request object
			const { _id: userId } = request?.user;
			// Send the user ID to the token microservice destroy-token method
			await new Promise((resolve, reject) => {
				this.tokenClientService.send("destroy-token", { userId }).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			return "User logged out successfully";
		} catch (err) {
			exceptionHandler(err);
		}
	}
}
