import { HttpException } from "@nestjs/common";

/**
 * Exception handler utility.
 * This utility is used to handle microservice exceptions.
 * @param error - Error object
 */
export function exceptionHandler(error: any) {
	if (error?.error) {
		// Convert RPC error to HttpException
		throw new HttpException(error?.error?.message, error?.error?.statusCode);
	}

	// Throw error as it is
	throw error;
}
