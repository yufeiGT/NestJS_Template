import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Launcher } from '@~crazy/launcher';

import { PaginationData } from '../Entity/paginationData';

/**
 * 响应拦截器
 */
@Injectable()
export class ResponseIntercepter<T>
	implements NestInterceptor<T, Launcher.Response<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>
	): Observable<Launcher.Response<T>> {
		next.handle();
		return next.handle().pipe(
			map((data) => {
				const code = Launcher.ResponseCode.Success;
				const message = Launcher.ResponseCode.getDescription(
					Launcher.ResponseCode.Success
				);
				const dateTime = Date.now();
				if (data instanceof PaginationData) {
					return {
						data: data.data,
						code,
						message,
						dateTime,
						pagination: data.pagination,
					};
				} else {
					return {
						data,
						code,
						message,
						dateTime,
					} as Launcher.Response<T>;
				}
			})
		);
	}
}
