const test = require('ava')
const alfyTest = require('alfy-test')

test('should has default output', async (t) => {
  const alfy = alfyTest()

  const result = await alfy(' ')

  console.log(result)

  t.snapshot(result)
})
