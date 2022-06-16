import { Injectable, CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { DatabaseRepository } from '@/database';

/** 权限字符串守卫 */
@Injectable()
class PermissionGuard implements CanActivate {
	constructor(private permissionKey: string) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { permissions } = await DatabaseRepository.RolesRepository.findOneBy({
			id: request.user.roleId,
		});
		const permissionKeys = permissions.map((item) => item.permissionKey);
		return permissionKeys.includes('*') || permissionKeys.includes(this.permissionKey);
	}
}

/** 权限字符串守卫装饰器 */
export const usePermissionGuard = (permissionKey: string) =>
	UseGuards(new PermissionGuard(permissionKey));
