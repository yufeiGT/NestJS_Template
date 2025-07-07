import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Launcher } from '@gluttons/launcher';

import { ResponseError } from 'src/Entity/response.error';
import { UserAuthInfoDto } from 'src/Auth/dto';
import { UserService } from 'src/Module/User/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY,
		});
	}

	async validate(payload: UserAuthInfoDto) {
		const { Success, ClientProhibitError, getDescription } =
			Launcher.ResponseCode;
		if (payload) {
			try {
				await this.userService.checkUser(payload.id);
				return payload;
			} catch (err) {
				if (err instanceof HttpException) {
					throw err;
				} else {
					new ResponseError({
						data: err?.response?.data || null,
						code: ClientProhibitError,
					}).thorwError();
				}
			}
		} else {
			new ResponseError({
				data: null,
				code: ClientProhibitError,
			}).thorwError();
		}
	}
}
