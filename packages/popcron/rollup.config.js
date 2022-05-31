import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import size from 'rollup-plugin-size'
import nodeResolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import externals from 'rollup-plugin-node-externals'

export default defineConfig([
  {
    input: 'index.ts',
    plugins: [
      externals({
        devDeps: false
      }),
      esbuild(), // so Rollup can convert TypeScript to JavaScript
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
