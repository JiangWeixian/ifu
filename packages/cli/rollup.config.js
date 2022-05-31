import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import size from 'rollup-plugin-size'
import multipleInput from 'rollup-plugin-multi-input'
import externals from 'rollup-plugin-node-externals'
import esbuild from 'rollup-plugin-esbuild'
import { defineConfig } from 'rollup'

export default defineConfig([
  {
    input: ['src/**.ts', '!**/**.d.ts'],
    plugins: [
      multipleInput(),
      externals({
        devDeps: false
      }),
      esbuild(), // so Rollup can convert TypeScript to JavaScript
      commonjs(),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [{ find: '@/', replacement: './src/' }],
      }),
      size()
    ],
    output: [
      { dir: 'lib', format: 'cjs', entryFileNames: '[name].cjs' },
      { dir: 'lib', entryFileNames: '[name].mjs', format: 'esm' },
    ],
  },
])
