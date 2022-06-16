import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class AppPermission extends BaseEntity {
	@Column({
		length: 100,
		comment: '权限名称',
	})
	permissionName: string;

	@Column({
		length: 100,
		comment: '权限字符串',
	})
	permissionKey: string;

	@Column({
		comment: '父级ID',
	})
	pid: number;
}
