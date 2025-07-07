import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Launcher } from '@gluttons/launcher';

import { ResponseData } from 'src/Interface/response';
import { PaginationData } from 'src/Entity/paginationData';

/**
 * 响应拦截器
 */
@Injectable()
export class ResponseIntercepter<T>
	implements NestInterceptor<T, ResponseData<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>
	): Observable<ResponseData<T>> {
		next.handle();
		return next.handle().pipe(
			map((data) => {
				const code = Launcher.ResponseCode.Success;
				const message = Launcher.ResponseCode.getDescription(
					Launcher.ResponseCode.Success
				);
				const timestamp = Date.now();
				if (data instanceof PaginationData) {
					return {
						data: data.data,
						code,
						message,
						timestamp,
						pagination: data.pagination,
					};
				} else {
					return {
						data,
						code,
						message,
						timestamp,
					} as ResponseData<T>;
				}
			})
		);
	}
}
