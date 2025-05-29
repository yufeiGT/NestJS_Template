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
			ClientProhibitError,
			ClientUnauthorizedError,
			getDescription,
		} = Launcher.ResponseCode;
		if (err || !user) {
			if (err) {
				const res: Launcher.Response<null> = {
					data: err,
					code: ClientProhibitError,
					message: getDescription(ClientProhibitError),
					dateTime: Date.now(),
				};
				throw new HttpException(res, Success);
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
