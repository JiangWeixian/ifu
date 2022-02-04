import solarLunar from 'solarlunar'
import dayjs from 'dayjs'
import suncalc from 'suncalc'

const PHASES = [
  { emoji: '🌑', code: ':new_moon_with_face:', name: 'New Moon', cname: '朔月', weight: 1 },
  {
    emoji: '🌒',
    code: ':waxing_crescent_moon:',
    name: 'Waxing Crescent',
    cname: '蛾眉月',
    weight: 6.3825,
  },
  { emoji: '🌓', code: ':first_quarter_moon:', name: 'First Quarter', cname: '上弦月', weight: 1 },
  {
    emoji: '🌔',
    code: ':waxing_gibbous_moon:',
    name: 'Waxing Gibbous',
    cname: '盈亏月',
    weight: 6.3825,
  },
  { emoji: '🌝', code: ':full_moon_with_face:', name: 'Full Moon', cname: '满月', weight: 1 },
  {
    emoji: '🌖',
    code: ':waning_gibbous_moon:',
    name: 'Waning Gibbous',
    cname: '亏凸月',
    weight: 6.3825,
  },
  { emoji: '🌗', code: ':last_quarter_moon:', name: 'Last Quarter', cname: '下弦月', weight: 1 },
  {
    emoji: '🌘',
    code: ':waning_crescent_moon:',
    name: 'Waning Crescent',
    cname: '残月',
    weight: 6.3825,
  },
]

const step = function (phase: number) {
  const weight = PHASES.reduce(function (a, b) {
    return a + b.weight
  }, 0)

  phase *= weight
  let rv = 0
  for (rv = 0; rv < PHASES.length; rv++) {
    phase -= PHASES[rv].weight
    if (phase <= 0) {
      break
    }
  }

  return rv
}

export const moonphase = (date: Date) => {
  const phase = suncalc.getMoonIllumination(date).phase
  const moonmoji = PHASES[step(phase)]
  return moonmoji
}

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

export const YEARS: Record<string, string> = {
  鼠: '🐭',
  牛: '🐮',
  虎: '🐯',
  兔: '🐇',
  龙: '🐉',
  蛇: '🐍',
  马: '🦄',
  羊: '🐏',
  猴: '🐒',
  鸡: '🐤',
  狗: '🐶',
  猪: '🐷',
}
export const lunar = {
  info() {
    const now = dayjs()
    const lunar: Lunar = solarLunar.solar2lunar(now.year(), now.month() + 1, now.date())
    const phase = moonphase(now.toDate())
    return [
      {
        title: `${YEARS[lunar.animal]} · ${lunar.animal}年`,
      },
      {
        title: `${phase.emoji} · ${phase.cname}`,
      },
      lunar.isTerm
        ? {
            title: lunar.term,
          }
        : undefined,
      {
        title: [lunar.monthCn, lunar.dayCn].join(''),
      },
      {
        title: [`${lunar.gzYear}年`, `${lunar.gzMonth}月`, `${lunar.gzDay}日`].join(' · '),
      },
    ]
  },
}
