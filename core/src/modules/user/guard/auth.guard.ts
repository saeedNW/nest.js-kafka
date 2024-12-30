import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { HttpArgumentsHost, OnModuleInit } from "@nestjs/common/interfaces";
import { ClientKafka } from "@nestjs/microservices";
import { isJWT } from "class-validator";
import { Request } from "express";
import { lastValueFrom } from "rxjs";
import { exceptionHandler } from "src/common/utilities/exception-handler.utility";

/**
 * AuthGuard class
 * This class is responsible for handling the authorization logic
 */
@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
	constructor(
		/** Inject user microservice */
		@Inject("USER_SERVICE")
		private readonly userClientService: ClientKafka,

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
		this.userClientService.subscribeToResponseOf("find-one");
		// Subscribe to the response of the token microservice
		this.tokenClientService.subscribeToResponseOf("verify-token");
		// Connect to user and token microservices
		await Promise.all([
			this.userClientService.connect(),
			this.tokenClientService.connect(),
		]);
	}

	async canActivate(context: ExecutionContext): Promise<boolean> | never {
		try {
			// Extract the request object from the context
			const httpContext: HttpArgumentsHost = context.switchToHttp();
			const request: Request = httpContext.getRequest<Request>();
			// Extract the access token from the request
			const token: string = this.extractToken(request);

			// Verify the token and extract the user ID
			const { userId }: any = await new Promise((resolve, reject) => {
				this.tokenClientService.send("verify-token", { token }).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			// Fetch the user from the user micro
			const { user }: any = await new Promise((resolve, reject) => {
				this.userClientService.send("find-one", { userId }).subscribe(
					(data) => resolve(data),
					(error) => reject(error)
				);
			});

			// Attach the user to the request object
			request.user = user;
			return true;
		} catch (err) {
			exceptionHandler(err);
		}
	}

	/**
	 * Extract token from request headers
	 * @param {Request} request - The incoming request object
	 */
	protected extractToken(request: Request): string {
		// Extract the authorization header from the request
		const { authorization } = request.headers;

		// Throw an error if the authorization header is missing or invalid
		if (!authorization || authorization?.trim() == "") {
			throw new UnauthorizedException("Authorization failed, please retry");
		}

		// Extract the bearer keyword and the token from the authorization header
		const [bearer, token] = authorization?.split(" ");

		// Throw an error if the token is missing or invalid
		if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) {
			throw new UnauthorizedException("Authorization failed, please retry");
		}

		return token;
	}
}
