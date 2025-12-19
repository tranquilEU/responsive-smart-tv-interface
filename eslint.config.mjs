import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
	{
		files: ['**/*.{js,jsx,ts,tsx}'],

		ignores: ['dist/**', 'node_modules/**'],

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: { jsx: true }
			}
		},

		plugins: {
			'@typescript-eslint': ts,
			react,
			'react-hooks': reactHooks
		},

		rules: {
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-unused-vars': ['warn'],
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn'
		},

		settings: {
			react: {
				version: 'detect'
			}
		}
	}
];
