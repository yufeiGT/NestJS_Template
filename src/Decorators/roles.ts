import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * 角色类型
 */
export type ROLE_TYPE = 'system' | 'admin' | 'user';

export function Roles(...roles: ROLE_TYPE[]) {
	return SetMetadata(ROLES_KEY, roles);
}
