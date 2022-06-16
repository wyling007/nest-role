import { Controller, Body, Post, Get } from '@nestjs/common';
import { AppPermissionService } from '@/services';
import { AppPermission } from '@/database/entities';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { usePermissionGuard } from '@/guard';

namespace AppPermissionDto {
	/** 注册请求验证类 */
	export class AddPermissionParams
		implements Pick<AppPermission, 'permissionName' | 'permissionKey' | 'pid'>
	{
		@IsString({
			message: '$property必须是字符串',
		})
		@IsNotEmpty()
		permissionName: string;

		@IsString({
			message: '$property必须是字符串',
		})
		@IsNotEmpty()
		permissionKey: string;

		@IsNumber({})
		@IsNotEmpty()
		pid: number;
	}
}

@Controller('system/appPermission')
export class AppPermissionController {
	/** 新增权限 */
	@Post('addPermission')
	AddPermission(@Body() params: AppPermissionDto.AddPermissionParams) {
		return AppPermissionService.addPermission(params);
	}
	/** 查询权限树 */
	@usePermissionGuard('system:appPermission:getPermissionTree')
	@Get('getPermissionTree')
	GetPermissionTree() {
		return AppPermissionService.getPermissionTree(0);
	}
}
