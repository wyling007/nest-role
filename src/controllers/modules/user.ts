import { Controller, Delete, Get, Request } from '@nestjs/common';
import { UserService } from '@/services';
import { User } from '@/database/entities';

@Controller('system/user')
export class UserController {
	/** 批量删除用户 */
	@Delete('deleteUsers')
	deleteUsers() {
		return UserService.deleteUsers([{ id: 1 }, { id: 2 }]);
	}
}
