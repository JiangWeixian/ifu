import alfy from 'alfy'
import dayjs from 'dayjs'
import WeekOfYear from 'dayjs/plugin/weekOfYear'
import IsLeapYear from 'dayjs/plugin/isLeapYear'
import DayOfYear from 'dayjs/plugin/dayOfYear'

dayjs.extend(WeekOfYear)
dayjs.extend(IsLeapYear)
dayjs.extend(DayOfYear)

const toItem = (
  value: number | string | boolean,
  { title, subtitle }: { title?: string | number | boolean; subtitle?: string } = {},
) => {
  return {
    title: title || value,
    subtitle: subtitle || '',
    arg: value,
    icon: {
      path: ' ', // Hide icon
    },
    text: {
      copy: value,
      largetype: value,
    },
  }
}

// const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const now = dayjs().valueOf()
const [startOfDay, endOfDay] = [dayjs().startOf('day').valueOf(), dayjs().endOf('day').valueOf()]
const [endOfYear, endOfMonth] = [dayjs().endOf('year').valueOf(), dayjs().endOf('month').valueOf()]
const [dayOfWeek, weekOfYear, dayOfYear] = [dayjs().day(), dayjs().week(), dayjs().dayOfYear()]
const isLeapYear = dayjs().isLeapYear()
const remain = dayjs().startOf('year').valueOf() / dayjs().endOf('year').valueOf()

const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const DEFAULT_ITEMS = [
  toItem(now),
  toItem(remain, { title: `今年已经过去了${remain * 100}%` }),
  toItem(dayOfWeek, {
    title: WEEK_DAYS[dayOfWeek],
    subtitle: `${dayOfWeek === 5 ? '🎉 是' : '💔 不是'}周五！`,
  }),
  toItem(dayOfYear, { title: `今天是一年中第${dayOfYear}天` }),
  toItem(weekOfYear, { title: `这周是第${weekOfYear}周` }),
  toItem(startOfDay, { subtitle: 'start of the day' }),
  toItem(endOfDay, { subtitle: 'end of the day' }),
  toItem(endOfYear, { subtitle: 'end of the year' }),
  toItem(endOfMonth, { subtitle: 'end of the month' }),
  toItem(isLeapYear, { title: isLeapYear ? '今年365天' : '今年364天' }),
]

alfy.output(DEFAULT_ITEMS)
