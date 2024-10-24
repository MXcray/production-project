module.exports = {
	settings: {
		react: {
			version: "detect",
		}
	},
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		// 'airbnb',
		'plugin:i18next/recommended',
		// 'plugin:storybook/recommended',
		// 'plugin:storybook/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'i18next',
		'react-hooks',
	  	'anton-plugin',
	],
	rules: {
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		indent: [2, 'tab'],
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.tsx'] },
		],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',
		'object-curly-spacing': ['error', 'always'],
		'i18next/no-literal-string': [
			'error',
			{
				markupOnly: true,
				ignoreAttribute: ['data-testid', 'to', 'justify', 'align', 'direction', 'gap', 'role'],
			},
		],
		'max-len': ['error', { code: 120, ignoreComments: true }],
		'no-tabs': 0,
		'number-leading-zero': 0,
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'no-param-reassign': 'off',
		'react/display-name': 'off',
		'i18next/no-literal-string': 'off',
		'no-undef': 'off',
	  	'anton-plugin/path-checker': 'error',
	},
	globals: {
		__IS_DEV__: true,
		__API__: true,
		__PROJECT__: true,
	},
	overrides: [
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
				'max-len': 'off',
			},
		},
	],
};
