export declare const moonphase: (date: Date) => {
  emoji: string
  code: string
  name: string
  cname: string
  weight: number
}
declare type Lunar = {
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
export declare const YEARS: Record<string, string>
export declare const lunar: {
  info(): {
    list: (
      | {
          title: string
        }
      | undefined
    )[]
    lunar: Lunar
    phase: {
      emoji: string
      code: string
      name: string
      cname: string
      weight: number
    }
  }
}
export {}
