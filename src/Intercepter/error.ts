import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ResponseData } from 'src/Interface/response';
import { ResponseError } from 'src/Entity/error';

@Injectable()
export class ErrorsInterceptor<T>
	implements NestInterceptor<T, ResponseData<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>
	): Observable<ResponseData<T>> {
		// @ts-ignore
		return next.handle().pipe(
			catchError((err) => {
				if (err instanceof ResponseError) {
					return throwError(err.thorwError());
				} else if (err instanceof HttpException) {
					return throwError(
						new ResponseError({
							data: err.message || err,
							code: err.getStatus(),
						}).thorwError()
					);
				} else {
					return throwError(
						new ResponseError({
							data: err.message || err,
						}).thorwError()
					);
				}
			})
		);
	}
}
