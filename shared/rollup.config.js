import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import size from 'rollup-plugin-size'
import multipleInput from 'rollup-plugin-multi-input'
import { defineConfig } from 'rollup'

export default defineConfig([
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: ['src/**.ts', '!**/**.d.ts'],
    plugins: [
      multipleInput(),
      typescript(), // so Rollup can convert TypeScript to JavaScript
      commonjs(),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [{ find: '@/', replacement: './src/' }],
      }),
      size(),
    ],
    output: [
      { dir: 'cjs', format: 'cjs' },
      { dir: 'esm', entryFileNames: '[name].mjs', format: 'esm' },
    ],
  },
])
