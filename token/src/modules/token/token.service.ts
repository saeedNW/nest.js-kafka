import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Token, tokenDocument } from "./schema/token.schema";
import { Model } from "mongoose";

@Injectable()
export class TokenService {
	constructor(
		// Inject the Token model
		@InjectModel(Token.name)
		private tokenModel: Model<tokenDocument>,

		// Inject jwt service
		private jwtService: JwtService
	) {}

	/**
	 * Create a new JWT token for the user with the given ID.
	 * @param userId - The ID of the user for whom the token is being created.
	 */
	async createToken(userId: string) {
		// Create a new JWT token for the user with the given ID.
		const token = this.jwtService.sign(
			{ userId },
			{
				expiresIn: "1d",
				secret: "d41d8cd98f00b204e9800998ecf8427e",
			}
		);

		// Save the token to the database.
		await this.saveUserToken(userId, token);

		return {
			message: "Token creates successfully",
			token,
		};
	}

	/**
	 * Verify the given JWT token.
	 * @param token - The JWT token to be verified.
	 */
	async verifyToken(token: string) {
		// validate the token
		const { userId } = this.tokenValidator(token);
		// Check if the token exists in the database
		const userToken = await this.tokenModel.findOne({ userId, token });
		// If the token does not exist, throw an error
		if (!userToken) {
			throw new UnauthorizedException("Authorization failed, please retry");
		}
		// Return the user ID
		return { userId };
	}

	/**
	 * Destroy the token for the given user.
	 * @param userId - The ID of the user for whom the token is being destroyed.
	 */
	async destroyToken(userId: string) {
		// Find the token by user ID and delete it
		const userToken = await this.tokenModel.findOneAndDelete({ userId });
		// If the token does not exist, throw an error
		if (!userToken) {
			throw new NotFoundException("Token was not found");
		}

		return {
			message: "Token destroyed successfully",
		};
	}

	/**
	 * Validates the given token.
	 * @param token - The token to be validated.
	 */
	private tokenValidator(token: string) {
		try {
			// Verify the token
			const payload = this.jwtService.verify(token, {
				secret: "d41d8cd98f00b204e9800998ecf8427e",
			});

			// Check if the payload is an object and contains the user ID
			if (typeof payload !== "object" && "userId" in payload) {
				throw new UnauthorizedException("Authorization failed, please retry");
			}

			return payload;
		} catch (error) {
			throw new UnauthorizedException("Authorization failed, please retry");
		}
	}

	/**
	 * Saves or updates the token for a given user.
	 * @param {string} userId - The ID of the user.
	 * @param {string} token - The token to be saved.
	 */
	private async saveUserToken(userId: string, token: string) {
		const userToken = await this.tokenModel.findOne({ userId });

		if (userToken) {
			// If token exists, update the token.
			userToken.token = token;
			await userToken.save();
		} else {
			// If token does not exist, create a new token.
			await this.tokenModel.create({ userId, token });
		}
	}
}
