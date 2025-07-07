import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Launcher } from '@gluttons/launcher';

import { ResponseData } from 'src/Interface/response';
import { ResponseError } from 'src/Entity/error';
import { UserAuthInfoDto } from 'src/Auth/dto';
import { ROLES_KEY, ROLE_TYPE } from 'src/Decorators/roles';
import { UserService } from 'src/Module/User/services';
import { userNotExist } from 'src/Module/User/utils';

/**
 * 角色守卫
 */
@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		@Inject(Reflector) private readonly reflector: Reflector,
		private readonly userService: UserService
	) {}

	async canActivate(context: ExecutionContext) {
		const roles = this.reflector.getAllAndOverride<ROLE_TYPE[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (roles) {
			const request: Request = context.switchToHttp().getRequest();
			const { id } = request.user as UserAuthInfoDto;
			const user = await this.userService.getUserById(id);
			if (user) {
				if (
					user.roles.includes('system') ||
					roles.some((item) => user.roles.includes(item))
				) {
					return true;
				} else {
					const { ClientRefuseError, getDescription } =
						Launcher.ResponseCode;
					new ResponseError({
						data: null,
						code: ClientRefuseError,
						message: `${getDescription(ClientRefuseError)}，该用户没有权限`,
					}).thorwError();
				}
			} else {
				userNotExist();
			}
		} else {
			return true;
		}
	}
}
