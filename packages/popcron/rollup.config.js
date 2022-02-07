import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import size from 'rollup-plugin-size'
import nodeResolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'

export default defineConfig([
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'index.ts',
    external: ['alfy', '@ifu/cli', 'cronstrue'],
    plugins: [
      typescript(), // so Rollup can convert TypeScript to JavaScript
      nodeResolve(),
      commonjs(),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [{ find: '@/', replacement: './src/' }],
      }),
      size(),
    ],
    output: [
      { dir: '.', entryFileNames: 'index.mjs', format: 'esm' },
    ],
  },
])
