import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Launcher } from '@~crazy/launcher';
import * as Spanner from '@gluttons/spanner';

@Injectable()
export class ErrorsInterceptor<T>
	implements NestInterceptor<T, Launcher.Response<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>
	): Observable<Launcher.Response<T>> {
		// @ts-ignore
		return next.handle().pipe(
			catchError((err) => {
				if (err instanceof HttpException) {
					const res = err.getResponse() as any;
					const code = res.statusCode;
					let data = res.data || null;
					let message: string =
						Launcher.ResponseCode.getDescription(code);
					if (res.message) {
						if (
							Spanner.isArray(res.message) ||
							Spanner.isObject(message)
						) {
							if (data == null) {
								data = res.message;
							}
						} else {
							message = res.message;
						}
					}
					return throwError(
						new HttpException(
							{
								data,
								code,
								message,
								dateTime: Date.now(),
							},
							Launcher.ResponseCode.Success
						)
					);
				} else {
					return throwError(
						new HttpException(
							{
								data: err.message || err,
								code: Launcher.ResponseCode.ServerInnerError,
								message: Launcher.ResponseCode.getDescription(
									Launcher.ResponseCode.ServerInnerError
								),
								dateTime: Date.now(),
							},
							Launcher.ResponseCode.Success
						)
					);
				}
			})
		);
	}
}
