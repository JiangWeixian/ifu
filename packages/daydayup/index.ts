import alfy from 'alfy'
import dayjs from 'dayjs'
import WeekOfYear from 'dayjs/plugin/weekOfYear'
import IsLeapYear from 'dayjs/plugin/isLeapYear'
import DayOfYear from 'dayjs/plugin/dayOfYear'

dayjs.extend(WeekOfYear)
dayjs.extend(IsLeapYear)
dayjs.extend(DayOfYear)

const toItem = (value: number | string | boolean) => {
  return {
    title: value,
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

const DEFAULT_ITEMS = [
  toItem(now),
  toItem(startOfDay),
  toItem(endOfDay),
  toItem(endOfYear),
  toItem(endOfMonth),
  toItem(dayOfWeek),
  toItem(weekOfYear),
  toItem(isLeapYear),
  toItem(dayOfYear),
]

alfy.output(DEFAULT_ITEMS)
