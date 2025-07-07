import {
	Injectable,
	ExecutionContext,
	Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Launcher } from '@gluttons/launcher';

import { ResponseError } from 'src/Entity/response.error';

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
		if (err || !user) {
			if (err) {
				throw err;
			} else {
				new ResponseError<null>({
					code: Launcher.ResponseCode.ClientUnauthorizedError,
				}).thorwError();
			}
		}
		return user;
	}
}
