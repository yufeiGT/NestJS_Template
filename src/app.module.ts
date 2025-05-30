import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

import { JwtAuthGuard } from 'src/Auth/jwt.auth.guards';
import { JwtStrategy } from 'src/Auth/jwt.strategy';
import { RolesGuard } from 'src/Guards/roles';

import { DBModule } from './db';
import { RootModule } from './Module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.register({
			isGlobal: true,
		}),
		HttpModule,
		JwtModule.register({
			global: true,
			secret: process.env.SECRET_KEY,
			signOptions: {
				expiresIn: '1days',
			},
		}),
		DBModule,
		RootModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		JwtStrategy,
		AppService,
	],
})
export class AppModule {}
