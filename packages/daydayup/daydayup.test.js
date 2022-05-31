import test from 'ava'
import alfyTest from 'alfy-test'
// import * as utils from './utils.js'

// FIXME: single test without alfy will pass follow test
// test('should parse string durations correct', async (t) => {
//   const input = '1y1m1ms'
//   t.deepEqual(utils.parseStringDurations(input), {
//     years: 1,
//     minutes: 1,
//     milliseconds: 1,
//   })
// })

test('should has default output', async (t) => {
  const alfy = alfyTest()

  const result = await alfy(' ')

  t.is(!!result, true)
})

// test('should support string durations', async (t) => {
//   const input = '1y1m1ms'
//   t.is(utils.isStringDuration(input), true)
// })

test('should support duration output', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('1y1h')

  t.is(!!result, true)
})

test('should support number duration output', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('d 366000')

  t.is(!!result, true)
})

test('should support parse time', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('2018-04-04T16:00:00.000Z')

  t.is(!!result, true)
})

test('should support parse now', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('now')

  t.is(!!result, true)
})
