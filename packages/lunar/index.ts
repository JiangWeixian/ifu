import * as solarLunar from 'solarlunar'
import dayjs from 'dayjs'
import alfy from 'alfy'

import { moonphase } from './moonphase'

type Lunar = {
  lYear: number
  lMonth: number
  lDay: number
  animal: string
  monthCn: string
  dayCn: string
  cYear: number
  cMonth: number
  cDay: number
  gzYear: string
  gzMonth: string
  gzDay: string
  isToday: boolean
  isLeap: boolean
  nWeek: number
  ncWeek: string
  isTerm: boolean
  term: string
}

const now = dayjs()
const lunar: Lunar = solarLunar.solar2lunar(now.year(), now.month(), now.day())
const phase = moonphase(now.toDate())

alfy.output(
  [
    {
      title: `${lunar.animal}年`,
      arg: lunar.animal,
      icon: {
        path: ' ', // Hide icon
      },
      text: {
        copy: lunar.animal,
        largetype: lunar.animal,
      },
    },
    {
      title: `${phase.emoji} ${phase.cname}`,
      arg: `${phase.emoji} ${phase.cname}`,
      icon: {
        path: ' ', // Hide icon
      },
      text: {
        copy: `${phase.emoji} ${phase.cname}`,
        largetype: `${phase.emoji} ${phase.cname}`,
      },
    },
    {
      title: [lunar.monthCn, lunar.dayCn].join(''),
      arg: [lunar.monthCn, lunar.dayCn].join(''),
      icon: {
        path: ' ', // Hide icon
      },
      text: {
        copy: [lunar.monthCn, lunar.dayCn].join(''),
        largetype: [lunar.monthCn, lunar.dayCn].join(''),
      },
    },
    lunar.isTerm
      ? {
          title: lunar.term,
          arg: lunar.term,
          icon: {
            path: ' ', // Hide icon
          },
          text: {
            copy: lunar.term,
            largetype: lunar.term,
          },
        }
      : undefined,
    {
      title: [lunar.monthCn, lunar.dayCn].join(''),
      arg: [lunar.monthCn, lunar.dayCn].join(''),
      icon: {
        path: ' ', // Hide icon
      },
      text: {
        copy: [lunar.monthCn, lunar.dayCn].join(''),
        largetype: [lunar.monthCn, lunar.dayCn].join(''),
      },
    },
    {
      title: [`${lunar.gzYear}年`, `${lunar.gzMonth}月`, `${lunar.gzDay}日`].join('·'),
      arg: [`${lunar.gzYear}年`, `${lunar.gzMonth}月`, `${lunar.gzDay}日`].join('·'),
      icon: {
        path: ' ', // Hide icon
      },
      text: {
        copy: [`${lunar.gzYear}年`, `${lunar.gzMonth}月`, `${lunar.gzDay}日`].join('·'),
        largetype: [`${lunar.gzYear}年`, `${lunar.gzMonth}月`, `${lunar.gzDay}日`].join('·'),
      },
    },
  ].filter((v) => !!v),
)
