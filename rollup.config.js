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
export default [
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
        extract: false,
        inject: { insertAt: 'top' }
      })
    ]
  },
  {
    input: 'src/index.ts',
    ouput: {
      file: packageJson.types,
      format: 'esm'
    },
    plugins: [...plugins, dts()],
    external: [/\.(css|scss)$/]
  }
];
