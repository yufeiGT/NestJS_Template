import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerFnMiddleware } from 'src/Middlewares/logger';

import { UserService } from './services';
import { UserController } from './controller';
import { User } from './entity';

/**
 * 用户
 */
@Module({
	imports: [
		HttpModule,
		NestjsFormDataModule.config({
			storage: MemoryStoredFile,
		}),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService, HttpModule],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerFnMiddleware);
	}
}
