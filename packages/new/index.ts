import alfy from 'alfy'
import FuzzySearch from 'fuzzy-search'

import { shortcuts } from './constants'

const searcher = new FuzzySearch(shortcuts, ['name'])

const results = alfy.input ? searcher.search(alfy.input) : shortcuts

alfy.output(
  results.map((item) => {
    return {
      title: item.name,
      subtitle: item.url,
      arg: item.url,
    }
  }),
)
