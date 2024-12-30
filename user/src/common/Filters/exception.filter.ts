import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	RpcExceptionFilter,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

/**
 * Implement custom response logic for exceptions.
 * This filter will change the service exception response
 * structure before sending it to client
 */
@Catch()
export class ServiceExceptionFilter
	implements ExceptionFilter, RpcExceptionFilter
{
	catch(exception: any, host: ArgumentsHost): Observable<any> {

		// Retrieves the HTTP status code from the response
		const statusCode: number = exception.getStatus();
		// Retrieve the exception's response message
		const exceptionResponse: string | object = exception.getResponse();

		// Retrieve the exception's response message
		let message =
			typeof exceptionResponse === "string"
				? exceptionResponse
				: (exceptionResponse as { message?: string }).message || "";

		const errorResponse = {
			statusCode,
			message,
		};

		return throwError(() => new RpcException(errorResponse));
	}
}
