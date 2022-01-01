import alfy from 'alfy'

import { shortcuts } from './constants'

alfy.output(
  shortcuts.map((item) => {
    return {
      title: item.name,
      subtitle: item.name,
      action: item.url,
    }
  }),
)
