import { Controller, Post, Body, Req, Put, Get, Delete } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/Auth/public';

import { Roles } from 'src/Decorators/roles';

import { UserService } from './services';
import {
	DeleteOrFreezeUserParamsDto,
	EditPasswordParamsDto,
	LoginParamsDto,
	RegisterParamsDto,
} from './Dto/request.dto';

@Controller('/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Post('/login')
	login(@Body() body: LoginParamsDto) {
		return this.userService.login(body);
	}

	@Public()
	@Post('/register')
	register(@Body() body: RegisterParamsDto) {
		return this.userService.register(body);
	}

	@Put('/password')
	editPassword(@Req() req: Request, @Body() body: EditPasswordParamsDto) {
		return this.userService.editPassword(req.user as any, body);
	}

	@Delete()
	@Roles('admin')
	deleteUser(@Body() body: DeleteOrFreezeUserParamsDto) {
		return this.userService.deleteUser(body);
	}

	@Get('/info')
	getUserInfo(@Req() req: Request) {
		return this.userService.getUserInfo(req.user as any);
	}

	@Put('/freeze')
	freezeUser(@Body() body: DeleteOrFreezeUserParamsDto) {
		return this.userService.freezeUser(body);
	}
}
