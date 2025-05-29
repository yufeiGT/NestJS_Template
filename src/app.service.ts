import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor() {}

	getHello(): string {
		return '运维查询工具 NestJs';
	}
}
