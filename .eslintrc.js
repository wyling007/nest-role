module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'no-console': 0,
		'@typescript-eslint/no-namespace': 0,
	},
};
