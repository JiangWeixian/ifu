import alfyTest from 'alfy-test'
import { test, expect } from 'vitest'

test('should has default output', async () => {
  const alfy = alfyTest()

  const result = await alfy(' ')

  expect(result.length).not.toBe(0)
})
