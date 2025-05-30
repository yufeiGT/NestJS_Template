import {
	Injectable,
	ExecutionContext,
	HttpException,
	Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Launcher } from '@~crazy/launcher';

import { IS_PUBLIC_KEY } from './public';

/**
 * 授权守卫
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(@Inject(Reflector) private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(
			IS_PUBLIC_KEY,
			[context.getHandler(), context.getClass()]
		);
		if (isPublic) {
			return true;
		} else {
			return super.canActivate(context);
		}
	}

	handleRequest(err, user, info) {
		const {
			Success,
			ClientUnauthorizedError,
			getDescription,
		} = Launcher.ResponseCode;
		if (err || !user) {
			if (err) {
				throw err;
			} else {
				const res: Launcher.Response<null> = {
					data: null,
					code: ClientUnauthorizedError,
					message: getDescription(ClientUnauthorizedError),
					dateTime: Date.now(),
				};
				throw new HttpException(res, Success);
			}
		}
		return user;
	}
}
