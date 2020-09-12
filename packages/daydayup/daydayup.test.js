const test = require('ava')
const alfyTest = require('alfy-test')

test('should has default output', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('')

  console.log(result)

  t.is(!!result, true)
})

test('should support duration output', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('1d')

  console.log(result)

  t.is(!!result, true)
})

test('should support number duration output', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('d 366000')

  console.log(result)

  t.is(!!result, true)
})
