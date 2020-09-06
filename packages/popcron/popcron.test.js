const test = require('ava')
const alfyTest = require('alfy-test')

test('main', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('0 23 ? * MON-FRI')

  t.deepEqual(result, [
    {
      title: 'At 11:00 PM, Monday through Friday',
    },
  ])
})
