import moduleAlias from 'module-alias';
import path from 'path';

//设置路径别名
moduleAlias.addAliases({
	'@': path.resolve(__dirname, '../'),
});
