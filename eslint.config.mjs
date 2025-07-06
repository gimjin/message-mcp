// @ts-check
import eslint from '@eslint/js'
import typescriptEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default typescriptEslint.config(
  { ignores: ['**/dist'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
    ],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {},
  },
  eslintConfigPrettier,
)
