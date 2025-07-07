import { Launcher } from '@gluttons/launcher';

export type ResponseData<
	T = any,
	P = any,
	R = Launcher.ResponseInit<T> &
		Launcher.ResponseExtra &
		Launcher.RequestOptions<T>,
> = P extends Launcher.PaginationParams ? R & Launcher.PaginationResponse : R;
