import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	js.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	{
		ignores: [
			'src-tauri/target/**',
			'src-tauri/gen/**',
			'.svelte-kit/**',
			'build/**',
			'node_modules/**'
		]
	},
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	}
];
