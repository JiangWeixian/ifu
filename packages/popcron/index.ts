import cronstrue from 'cronstrue/i18n'
import alfy from 'alfy'

const DEFAULT_LOCALE = 'en'
const KEY = 'history'
const history = alfy.cache.get(KEY)
if (!history) {
  alfy.output(JSON.parse(history))
} else {
  const result = cronstrue.toString(alfy.input, { locale: process.env.locale || DEFAULT_LOCALE })
  const item = {
    title: result,
    subtitle: alfy.input,
    arg: result,
    icon: {
      path: ' ', // Hide icon
    },
    text: {
      copy: result,
      largetype: result,
    },
  }

  alfy.output([item])

  alfy.cache.set(KEY, JSON.stringify([item].concat(history)))
}
