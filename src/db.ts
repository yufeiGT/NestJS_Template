import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: DB_HOST,
			// @ts-ignore
			port: DB_PORT,
			database: DB_DATABASE,
			username: DB_USERNAME,
			password: DB_PASSWORD,
			synchronize: true,
			autoLoadEntities: true,
		}),
	],
})
export class DBModule {}
