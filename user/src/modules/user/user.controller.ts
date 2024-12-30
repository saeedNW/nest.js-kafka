import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ILogin } from "./interfaces/login.interface";
import { IRegister } from "./interfaces/register.interface";
import { IPaginationDto } from "src/common/utilities/pagination.utility";

@Controller("User")
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * Handles the "register" message pattern.
	 * Registers a new user.
	 * @param {IRegister} registerDto - The data transfer object containing registration details.
	 */
	@MessagePattern("register")
	register(@Payload() registerDto: IRegister) {
		return this.userService.register(registerDto);
	}

	/**
	 * Handles the "login" message pattern.
	 * Logs in a user.
	 * @param {ILogin} loginDto - The data transfer object containing login details.
	 */
	@MessagePattern("login")
	login(@Payload() loginDto: ILogin) {
		return this.userService.login(loginDto);
	}

	/**
	 * Handles the "find-all" message pattern.
	 * Retrieves all users.
	 * @param {IPaginationDto} paginationDto - The pagination data transfer object
	 */
	@MessagePattern("find-all")
	findAll(@Payload() paginationDto: IPaginationDto) {
		return this.userService.findAll(paginationDto);
	}

	/**
	 * Handles the "find-one" message pattern.
	 * Retrieves a user by their ID.
	 * @param {string} userId - The ID of the user to retrieve.
	 */
	@MessagePattern("find-one")
	findOne(@Payload() { userId }: { userId: string }) {
		return this.userService.findOne(userId);
	}
}
