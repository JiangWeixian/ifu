import execa from 'execa'
import path from 'path'
import pkg from '../package.json'
import { describe, it, expect } from 'vitest'

const cli = path.resolve(__dirname, '../lib/cli.cjs')

describe('version', () => {
  it('print version should work', async () => {
    const { stdout } = await execa.node(cli, ['-V'])
    expect(stdout).toBe(pkg.version)
  })

  it('check install should work', async () => {
    const { exitCode } = await execa
      .node(cli, ['-c'], { stderr: 'inherit' })
      .catch(() => ({ exitCode: 1 }))
    if (process.platform === 'darwin') {
      expect(exitCode).toBe(1)
    } else {
      expect(exitCode).toBe(0)
    }
  })
})
