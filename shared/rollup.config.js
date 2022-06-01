import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import size from 'rollup-plugin-size'
import multipleInput from 'rollup-plugin-multi-input'
import externals from 'rollup-plugin-node-externals'
import typescript from 'rollup-plugin-typescript2'
import { defineConfig } from 'rollup'
import ce from 'rollup-plugin-condition-exports'

export default defineConfig([
  {
    input: ['src/**.ts', '!**/**.d.ts'],
    plugins: [
      multipleInput(),
      externals({
        devDeps: false
      }),
      typescript(), // so Rollup can convert TypeScript to JavaScript
      commonjs(),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [{ find: '@/', replacement: './src/' }],
      }),
      size(),
      ce(),
    ],
    output: [
      { dir: 'dist', format: 'cjs', entryFileNames: '[name].cjs' },
      { dir: 'dist', entryFileNames: '[name].mjs', format: 'esm' },
    ],
  },
])
