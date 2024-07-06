import packageJson from './package.json' assert { type: 'json' };
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';
const plugins = [
  typescript({ tsconfig: './tsconfig.json' }),
  //babel转译
  babel({
    exclude: 'node_modules/**'
  }),
  commonjs(),
  resolve(),
  //处理vue组件
  vue({
    css: true,
    compileTemplate: true
  })
];
export default [
//打包vue组件
  {//外部引入vue
    external: ['vue'],
    input: 'src/index.ts',
    output: [
      { file: packageJson.main, format: 'cjs', sourcemap: true },
      { file: packageJson.module, format: 'esm', sourcemap: true }
    ],
    plugins: [
      ...plugins,
    //样式文件处理
      scss(),
      postcss({
        extensions: ['.css', '.scss'],
        minimize: true,
        sourceMap: true,
        modules: true,
        extract: false,
        inject: { insertAt: 'top' }
      })
    ]
  },
  //打包d.ts文件
  {
    input: 'src/index.ts',
    ouput: {
      file: packageJson.types,
      format: 'esm'
    },
    plugins: [...plugins, dts()],
    //注意vue里面有样式style会作为其中模块，一定要添加external去除
    external: [/\.(css|scss)$/]
  }
];