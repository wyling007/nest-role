import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/baseEntity';
import { AppPermission } from './appPermissions';

@Entity()
export class Role extends BaseEntity {
	@Column({
		length: 100,
		comment: '角色名',
	})
	roleName: string;

	@ManyToMany(() => AppPermission)
	@JoinTable()
	permissions: AppPermission[];
}
