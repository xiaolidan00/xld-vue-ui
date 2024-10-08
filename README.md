# vue基础UI库

# 1.配置rollup.config

- 安装babel

```json
{
    "@babel/core": "^7.24.7",
    "@babel/preset-env": "^7.24.7",
     "@vue/babel-plugin-jsx": "^1.2.2",
}
```

- 配置.babelrc

```json
{
  "presets": ["@babel/preset-env", "@vue/babel-plugin-jsx"]
}

```

- 安装typescript

```json
{
    "@vue/tsconfig": "^0.5.1",
    "tslib": "^2.6.3",
    "typescript": "^5.4.5",
    "vue": "^3.4.31",
    "vue-tsc": "^2.0.24"
}
```

- 安装rollup

```json
{
   "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^26.0.1",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.6", 
    "rollup": "^4.18.0",
    "rollup-plugin-dts": "^6.1.1",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-scss": "^4.0.0",
    "rollup-plugin-typescript2": "^0.36.0",
    "rollup-plugin-vue": "^6.0.0",
     "sass": "^1.77.6",
}
```

- rollup.config.js
打包组件

```js
const plugins = [
  typescript({ tsconfig: './tsconfig.json' }),
  babel({
    exclude: 'node_modules/**' // 只转译我们的源代码
  }),

  commonjs(),
  resolve(),
  vue({
    css: true,
    compileTemplate: true
  })
];
{
    external: ['vue'],
    input: 'src/index.ts',
    output: [
      { file: packageJson.main, format: 'cjs', sourcemap: true },
      { file: packageJson.module, format: 'esm', sourcemap: true }
    ],
    plugins: [
      ...plugins,

      scss(),
      postcss({
        extensions: ['.css', '.scss'],
        minimize: true,
        sourceMap: true,
        modules: true,
        inject: { insertAt: 'top' }
      })
    ]
  },
```

打包d.ts

```js
{
    input: 'src/index.ts',
    ouput: {
      file: packageJson.types,
      format: 'esm'
    },
    plugins: [...plugins, dts()],
    external: [/\.(css|scss)$/]
  }
```

# 2.storybook配置

创建storyBook

```bash
pnpm add storybook -D
pnpm exec sb init
```

在src/stories文件夹里面会自动生成一些示例组件

运行或构建storyBook

```bash
 "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
```

自动添加storybook依赖

```json
{
    "@chromatic-com/storybook": "1.6.0",
    "@storybook/addon-essentials": "^8.1.11",
    "@storybook/addon-interactions": "^8.1.11",
    "@storybook/addon-links": "^8.1.11",
    "@storybook/blocks": "^8.1.11",
    "@storybook/test": "^8.1.11",
    "@storybook/vue3": "^8.1.11",
    "@storybook/vue3-vite": "^8.1.11",
    "storybook": "^8.1.11",
}
```

需安装

vite
@vitejs/plugin-vue

- .storybook/main.ts修改storybook

```ts
import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      cacheDir: 'node_modules/.vite-storybook' // 避免跟开发环境一个缓存目录，以免相互覆盖；
    });
  }
};
export default config;

```

# 3.vitest测试组件

<https://juejin.cn/post/7129667747134308389>

需要安装的库


用于测试报告
@vitest/ui
@vitest/coverage-v8

coverage测试报告

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/tests/*.test.ts'],
      environment: 'happy-dom',
      reporters: ['html']
    }
  })
);

```

# 4.代码规范

- .prettierrc

```json
{
  "eslintIntegration": true,
  "stylelintIntegration": true,
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "none"
}

```

- 安装eslint

<https://typescript-eslint.nodejs.cn/getting-started/>

```bash
eslint --init
```

eslint.config.js

- globals 全局变量，window,document
- eslint-plugin-vue
- @eslint/compat 兼容性
- @eslint/js
- typescript-eslint ts检测

```js
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
      '@typescript-eslint/no-explicit-any': 'off'
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

```

 .eslintrc
<https://eslint.vuejs.org/user-guide/>

- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-plugin-vue
- vue-eslint-parser

```json
{
  "root": true,
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser"
  }
}
```

- 提交规范

husky在git hooks提交前执行代码检查，测试之类的

commitizen cz-conventional-changelog 命令行提示提交代码规范

lint-staged 代码检查成功才staged

```bash
pnpm add -D husky commitizen cz-conventional-changelog conventional-changelog-cli

pnpm husky init

git commit -m <type>[optional scope]: <description>

# 交互式提交代码
cz

# 生成changlog
conventional-changelog -p angular -i CHANGELOG.md -s

```

packages.json的husky和cz配置

```json
 "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "prepare-commit-msg": "exec < /dev/tty && npx cz --hook || true"
    }
  },
```

- commitlint.config.js

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
pnpm exec commitlint --config commitlint.config.js --edit "${1}"
```

```js
export default {
  extends: ['@commitlint/config-conventional']
   
};

```
