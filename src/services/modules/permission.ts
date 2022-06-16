import { DatabaseRepository } from '@/database';
import { AppPermission } from '@/database/entities';
import { HttpException } from '@nestjs/common';

/** App权限服务 */
export namespace AppPermissionService {
	/** 新增app权限 */
	export async function addPermission(
		permission: Pick<AppPermission, 'permissionName' | 'permissionKey' | 'pid'>
	) {
		const oldPermission = await DatabaseRepository.AppPermissionRepository.findOne({
			where: { permissionKey: permission.permissionKey },
		});
		if (oldPermission) {
			throw new HttpException('权限字符串已存在', 400);
		}
		const parent = await DatabaseRepository.AppPermissionRepository.findOneBy({
			id: permission.pid,
		});
		if (!parent && permission.pid !== 0) {
			throw new HttpException('父级权限不存在', 400);
		}
		return await DatabaseRepository.AppPermissionRepository.save({
			...new AppPermission(),
			...permission,
		});
	}
	/** 修改app权限 */
	export async function editPermission(
		permission: Pick<AppPermission, 'id' | 'permissionName' | 'permissionKey' | 'pid'>
	) {
		const permissionEntity = await DatabaseRepository.AppPermissionRepository.findOne({
			where: { id: permission.id },
		});
		if (!permissionEntity) {
			throw new HttpException('权限不存在', 400);
		}
		const editAfterPermission = await DatabaseRepository.AppPermissionRepository.save({
			...permissionEntity,
			...permission,
		});
		return editAfterPermission;
	}
	/** 删除app权限 */
	export async function deletePermission(params: Pick<AppPermission, 'id'>) {
		const permissionEntity = await DatabaseRepository.AppPermissionRepository.findOne({
			where: { id: params.id },
		});
		if (!permissionEntity) {
			throw new HttpException('权限不存在', 400);
		}
		const deleteAfterPermission = await DatabaseRepository.AppPermissionRepository.softRemove(
			permissionEntity
		);
		return deleteAfterPermission;
	}
	/** 查询app权限树 */
	export async function getPermissionTree(pid: number) {
		const permissionList = await DatabaseRepository.AppPermissionRepository.find({
			where: { pid },
		});
		for (const item of permissionList) {
			Reflect.set(item, 'children', await getPermissionTree(item.id));
		}
		return permissionList;
	}
}
