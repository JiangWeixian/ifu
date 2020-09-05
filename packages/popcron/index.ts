import cronstrue from 'cronstrue/i18n'
import alfy from 'alfy'

const DEFAULT_LOCALE = 'en'
const item = cronstrue.toString(alfy.input, { locale: process.env.locale || DEFAULT_LOCALE })

alfy.output([
  {
    title: item,
    icon: {
      path: ' ' // Hide icon
    }
  }
]);
