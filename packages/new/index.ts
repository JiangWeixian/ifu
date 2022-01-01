import alfy from 'alfy'

import { shortcuts } from './constants'

alfy.output(
  shortcuts.map((item) => {
    return {
      title: item.name,
      autocomplete: item.name,
      action: {
        url: item.url,
      },
    }
  }),
)
