module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'airbnb',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': [
			1,
			{ prefixWithI: 'always' },
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'import/extensions': [
			2,
			{
				extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
			},
		],
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton'],
			},
		],
		'no-tabs': 0,
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-indent': [2, 'tab'],
		indent: [2, 'tab'],
		'react/jsx-indent-props': [0],
		'react/no-array-index-key': [0],
		'no-console': 'off', // @TODO; Remove in production
		'no-unused-vars': [0],
		'linebreak-style': [0],
	},
};
