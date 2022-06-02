import { template } from 'lodash-es'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'

dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)

const tpls = {
  // snippets: query [start, end] items in logseq
  queryStaticRange: template('{{query (between [[<%= start %>]] [[<%= end %>]] )}}'),
}

export const queryStatic7dRanges = () => {
  const list = []
  for (let i = 0; i < 7; i++) {
    const end = dayjs().subtract(i, 'day').format('MMMM Do, YYYY')
    const start = dayjs()
      .subtract(7 + i, 'day')
      .format('MMMM Do, YYYY')
    list.push(tpls.queryStaticRange({ start, end }))
  }
  return list
}
