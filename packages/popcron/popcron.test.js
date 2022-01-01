import test from 'ava'
import alfyTest from 'alfy-test'

test('main', async (t) => {
  const alfy = alfyTest()

  const result = await alfy('0 23 ? * MON-FRI')

  t.deepEqual(result, [
    {
      arg: 'At 11:00 PM, Monday through Friday',
      icon: {
        path: ' ',
      },
      subtitle: '0 23 ? * MON-FRI',
      text: {
        copy: 'At 11:00 PM, Monday through Friday',
        largetype: 'At 11:00 PM, Monday through Friday',
      },
      title: 'At 11:00 PM, Monday through Friday',
    },
  ])
})
