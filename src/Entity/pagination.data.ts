import { Launcher } from '@gluttons/launcher';

/**
 * 分页数据
 * @param data 数据
 * @param pagination 分页数据
 */
export class PaginationData<T> {
	constructor(data: typeof this.data, pagination: typeof this.pagination) {
		this.data = data;
		this.pagination = pagination;
	}

	data: T;
	pagination: Launcher.PaginationResponse;
}
