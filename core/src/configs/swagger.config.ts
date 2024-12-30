import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

/**
 * Configure swagger document
 * @param app NestJS Application instance
 */
export function swaggerConfiguration(app: INestApplication) {
	// Define swagger document options
	const document = new DocumentBuilder()
		.setTitle("NestJS TCP Microservice")
		.setDescription("Practical experience of NestJS TCP Microservice")
		.setVersion("0.0.1")
		.addBearerAuth(swaggerBearerAuthConfig(), "Authorization")
		.build();

	// Create swagger document
	const swaggerDocument = SwaggerModule.createDocument(app, document);

	// Setup swagger document
	SwaggerModule.setup("/api-doc", app, swaggerDocument);
}

/**
 * Swagger bearer Auth scheme configuration
 * @returns {SecuritySchemeObject} - Swagger security scheme object
 */
function swaggerBearerAuthConfig(): SecuritySchemeObject {
	return {
		type: "http",
		bearerFormat: "JWT",
		in: "header",
		scheme: "bearer",
	};
}
