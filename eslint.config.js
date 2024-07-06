import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import { fixupConfigRules } from '@eslint/compat';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginVue.configs['flat/essential']),
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'], 
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      "@typescript-eslint/no-unused-vars":'off'
    },
    ignores: ['**/*.d.{ts}'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      globals:globals.browser
    }
  }
];
