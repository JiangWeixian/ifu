import { it, expect } from 'vitest'

import { queryStatic7dRanges } from '../src/logseq'

it('query static 7d range', () => {
  console.log(queryStatic7dRanges())
  expect(queryStatic7dRanges().length).toBe(7)
})
