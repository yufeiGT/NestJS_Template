import { HttpException } from '@nestjs/common';
import { Launcher } from '@gluttons/launcher';
import * as Spanner from '@gluttons/spanner';

import { ResponseData } from 'src/Interface/response';

export class ResponseError<T = any> {
	constructor(error: Partial<ResponseData<T>> = {}) {
		this.#errorData = Spanner.merge(
			{
				data: null,
				code: Launcher.ResponseCode.ServerInnerError,
				message: null,
				timestamp: Date.now(),
			},
			error
		) as any;
	}

	/**
	 * 错误数据
	 */
	#errorData: ResponseData<T>;

	/**
	 * 抛出错误
	 */
	thorwError() {
		const { Success, getDescription } = Launcher.ResponseCode;
		const error = {
			...this.#errorData,
		};
		if (error.message == null) {
			error.message = getDescription(error.code) || null;
		}
		throw new HttpException(error, Success);
	}
}
