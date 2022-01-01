import alfy from 'alfy'

import data from './new.json'

alfy.output(
  data.map((item) => {
    return {
      title: item.name,
      autocomplete: item.name,
      action: {
        url: item.url,
      },
    }
  }),
)
