import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { IRegister } from "./interfaces/register.interface";
import { ILogin } from "./interfaces/login.interface";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import {
	IPaginationDto,
	paginate,
	PaginatedResult,
} from "src/common/utilities/pagination.utility";

@Injectable()
export class UserService {
	constructor(
		// Inject the User model
		@InjectModel(User.name)
		private userModel: Model<UserDocument>
	) {}

	/**
	 * Registers a new user with the provided registration details.
	 * @param {IRegister} registerDto - The data transfer object containing registration details.
	 */
	async register(registerDto: IRegister) {
		// Destructure register dto properties
		let { email, name, password } = registerDto;
		// Check for duplicated email address
		await this.duplicatedEmail(email);
		// Encrypt user's password
		password = this.passwordEncoder(password);
		// Insert user to database
		const user = await this.userModel.create({ name, email, password });

		return {
			message: "User account created successfully",
			userId: user.id.toString(),
		};
	}

	/**
	 * Logs in a user with the provided login details.
	 * @param {ILogin} loginDto - The data transfer object containing login details.
	 */
	async login(loginDto: ILogin) {
		// Destructure login dto properties
		let { email, password } = loginDto;
		// Retrieve user by email address
		const user = await this.getUserByEmail(email);
		// Compare password
		if (!this.comparePassword(user.password, password)) {
			throw new UnauthorizedException("Invalid credentials");
		}

		return {
			message: "User logged in successfully",
			userId: user.id,
		};
	}

	/**
	 * Retrieves all users.
	 * @param {IPaginationDto} paginationDto - The pagination data transfer object
	 */
	async findAll(
		paginationDto: IPaginationDto
	): Promise<PaginatedResult<UserDocument>> {
		return paginate<UserDocument>(
			paginationDto,
			this.userModel,
			{},
			`${process.env.CORE_APPLICATION_URL}/user/find-all`
		);
	}

	/**
	 * Retrieves a user by their ID.
	 * @param {string} userId - The ID of the user to retrieve.
	 */
	async findOne(userId: string) {
		// Find user by ID
		const user = await this.userModel.findById(userId, { password: 0 });
		// Throw error if user was not found
		if (!user) {
			throw new NotFoundException("User not found");
		}
		// Return user if found
		return { user };
	}

	/**
	 * Check for duplicated email address
	 * @param {string} email - User's email address
	 */
	private async duplicatedEmail(email: string) {
		// Check for duplicated email address
		const user = await this.userModel.findOne({ email });
		// Throw error if email was duplicated address
		if (user) {
			throw new ConflictException("Duplicated email address");
		}
	}

	/**
	 * Retrieves a user by their email address.
	 * @param {string} email - The email address of the user to retrieve.
	 */
	private async getUserByEmail(email: string) {
		// Retrieve user by email address
		const user = await this.userModel.findOne({ email });
		// Throw error if user was not found
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}
		// Return user if found
		return user;
	}

	/**
	 * Encodes a given password using a generated salt.
	 * @param password - The plain text password to be encoded.
	 */
	private passwordEncoder(password: string) {
		// Generate password encryption salt
		const salt = genSaltSync();
		// return encrypted password
		return hashSync(password, salt);
	}

	/**
	 * Compares a given password with an encoded password.
	 * @param {string} encodedPassword - The encoded password to compare against.
	 * @param {string} password - The plain text password to compare.
	 */
	private comparePassword(encodedPassword: string, password: string) {
		return compareSync(password, encodedPassword);
	}
}
