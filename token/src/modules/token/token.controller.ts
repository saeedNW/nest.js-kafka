import { Controller } from "@nestjs/common";
import { TokenService } from "./token.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class TokenController {
	constructor(private readonly tokenService: TokenService) {}

	/**
	 * Handles the "create-user-token" message pattern.
	 * Create a new JWT token for the user with the given ID.
	 * @param {string} userId - The ID of the user for whom the token is being created.
	 */
	@MessagePattern("create-token")
	createToken(@Payload() { userId }: { userId: string }) {
		return this.tokenService.createToken(userId);
	}

	/**
	 * Handles the "verify-token" message pattern.
	 * Verify the given JWT token.
	 * @param {string} token - The JWT token to be verified.
	 */
	@MessagePattern("verify-token")
	verifyToken(@Payload() { token }: { token: string }) {
		return this.tokenService.verifyToken(token);
	}

	/**
	 * Handles the "destroy-token" message pattern.
	 * Destroy the JWT token for the user with the given ID.
	 * @param {string} userId - The ID of the user for whom the token is being destroyed.
	 */
	@MessagePattern("destroy-token")
	destroyToken(@Payload() { userId }: { userId: string }) {
		return this.tokenService.destroyToken(userId);
	}
}
