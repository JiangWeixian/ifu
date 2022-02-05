import alfy from 'alfy'
import { lunar } from '@ifu/shared/lunar'
import { compact } from 'lodash-es'

alfy.output(
  compact(lunar.info().list).map((item) => {
    return {
      title: item.title,
      arg: item.title,
      icon: {
        path: ' ', // Hide icon
      },
      text: {
        copy: item.title,
        largetype: item.title,
      },
    }
  }),
)
