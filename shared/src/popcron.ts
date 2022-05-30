import cronstrue from 'cronstrue/i18n.js'

const DEFAULT_LOCALE = 'en'

export const popcron = {
  parse(input: string) {
    return cronstrue.toString(input, { locale: process.env.locale || DEFAULT_LOCALE })
  },
}
