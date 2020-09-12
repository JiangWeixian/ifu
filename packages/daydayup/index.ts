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

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const now = dayjs()
// const [startOfDay, endOfDay] = [dayjs().startOf('day'), dayjs().endOf('day')]
const [startOfYear, endOfYear, endOfMonth] = [
  dayjs().startOf('year'),
  dayjs().endOf('year'),
  dayjs().endOf('month'),
]
const [dayOfWeek, weekOfYear, dayOfYear] = [dayjs().day(), dayjs().week(), dayjs().dayOfYear()]
const isLeapYear = dayjs().isLeapYear()
const remain =
  (now.valueOf() - startOfYear.valueOf()) / (endOfYear.valueOf() - startOfYear.valueOf())

const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const DEFAULT_ITEMS = [
  toItem(now.valueOf(), { title: `今天是${now.format(DEFAULT_FORMAT)}` }),
  toItem(remain, { title: `今年已经过去了${remain * 100}%` }),
  toItem(dayOfWeek, {
    title: `今天是${WEEK_DAYS[dayOfWeek]}${dayOfWeek === 5 ? '🎉🎉🎉' : ''}`,
  }),
  toItem(dayOfYear, { title: `今天是一年中第${dayOfYear}天` }),
  toItem(weekOfYear, { title: `这周是一年中第${weekOfYear}周` }),
  toItem(endOfYear.valueOf(), { title: `今年最后一天是${endOfYear.format(DEFAULT_FORMAT)}` }),
  toItem(endOfMonth.valueOf(), { title: `这个月最后一天是${endOfMonth.format(DEFAULT_FORMAT)}` }),
  toItem(isLeapYear, { title: isLeapYear ? '今年有365天' : '今年有364天' }),
]

alfy.output(DEFAULT_ITEMS)
