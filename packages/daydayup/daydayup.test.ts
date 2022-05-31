import alfyTest from 'alfy-test'
import { test, expect } from 'vitest'
import * as utils from './utils'

// FIXME: single test without alfy will pass follow test
test('should parse string durations correct', async () => {
  const input = '1y1m1ms'
  expect(utils.parseStringDurations(input)).toMatchObject({
    years: 1,
    minutes: 1,
    milliseconds: 1,
  })
})

test('should has default output', async () => {
  const alfy = alfyTest()

  const result = await alfy(' ')
  expect(!!result).toBe(true)
})

test('should support string durations', async () => {
  const input = '1y1m1ms'
  expect(utils.isStringDuration(input)).toBe(true)
})

test('should support duration output', async () => {
  const alfy = alfyTest()

  const result = await alfy('1y1h')

  expect(!!result).toBe(true)
})

test('should support number duration output', async () => {
  const alfy = alfyTest()

  const result = await alfy('d 366000')

  expect(!!result).toBe(true)
})

test('should support parse time', async () => {
  const alfy = alfyTest()

  const result = await alfy('2018-04-04T16:00:00.000Z')

  expect(!!result).toBe(true)
})

test('should support parse now', async () => {
  const alfy = alfyTest()

  const result = await alfy('now')

  expect(!!result).toBe(true)
})
