import {
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({
		name: 'created_time',
		type: 'datetime',
		comment: '创建时间',
		select: false,
	})
	createdTime: string;

	@UpdateDateColumn({
		name: 'updated_time',
		type: 'datetime',
		comment: '更新时间',
		select: false,
	})
	updatedTime: string;

	@DeleteDateColumn({
		name: 'deleted_time',
		type: 'datetime',
		comment: '删除时间',
		select: false,
	})
	deletedTime: string;
}
