import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

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
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      globals:globals.browser
    }
  }
];
