import * as solarLunar from 'solarlunar'
import dayjs from 'dayjs'
import alfy from 'alfy'

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

console.log(lunar)

alfy.output(
  [
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
