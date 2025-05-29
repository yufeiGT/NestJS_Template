import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('logger middleware');
		next();
	}
}

export function LoggerFnMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('logger fn middleware');
	next();
}
