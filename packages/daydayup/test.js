const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')

dayjs.extend(duration)

year = dayjs.duration('120')

console.log(year.asHours())