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
@vue/test-utils@next
happy-dom
vitest

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
