//初始化项目前最优先设置路径别名,顺序乱了会报错
import './plugins/alias';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { initSwagger } from './plugins/swagger';
import { JwtAuthMiddleware } from './middlewares';
import { InitService } from '@/services';

(async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	//初始化swagger文档
	initSwagger(app);
	//初始化数据库
	await InitService.initDatabase();
	//全局auth中间件
	app.use(JwtAuthMiddleware);
	//全局验证器
	app.useGlobalPipes(new ValidationPipe());
	//启动监听端口
	await app.listen(3009);
})();
