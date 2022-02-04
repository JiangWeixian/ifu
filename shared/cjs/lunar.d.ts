export declare const moonphase: (date: Date) => {
  emoji: string
  code: string
  name: string
  cname: string
  weight: number
}
export declare const YEARS: Record<string, string>
export declare const lunar: {
  info(): (
    | {
        title: string
      }
    | undefined
  )[]
}
