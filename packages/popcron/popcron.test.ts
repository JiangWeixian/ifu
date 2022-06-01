import alfyTest from 'alfy-test'
import { test, expect } from 'vitest'

test('main', async () => {
  const alfy = alfyTest()

  const result = await alfy('0 23 ? * MON-FRI')

  expect(result).toMatchObject([
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
