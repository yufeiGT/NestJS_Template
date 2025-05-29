import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

const config = dotenv.config();
if (config.error) {
	throw config.error;
}

import { AppModule } from './app.module';

import { ResponseIntercepter } from './Intercepter/response';
import { ErrorsInterceptor } from './Intercepter/error';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(
		new ErrorsInterceptor(),
		new ResponseIntercepter()
	);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		// allowedHeaders: ['content-type'],
		// origin: ['http://localhost:9000'],
		origin: true,
		credentials: true,
	});
	await app.listen(process.env.PORT);
}

bootstrap();
