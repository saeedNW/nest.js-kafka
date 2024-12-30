import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { swaggerConfiguration } from "./configs/swagger.config";
import { HttpExceptionFilter } from "./common/Filters/exception.filter";
import { ResponseTransformerInterceptor } from "./common/interceptor/response-transformer.interceptor";
import { UnprocessableEntityPipe } from "./common/pipe/unprocessable-entity.pipe";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// initialize custom exception filter
	app.useGlobalFilters(new HttpExceptionFilter());

	// initialize custom validation pipe
	app.useGlobalPipes(new UnprocessableEntityPipe());

	// initialize custom response interceptor
	app.useGlobalInterceptors(new ResponseTransformerInterceptor());

	// initialize swagger
	swaggerConfiguration(app);

	await app.listen(3000, () =>
		console.log("Core application is running on http://localhost:3000")
	);
}
bootstrap();
