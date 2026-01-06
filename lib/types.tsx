export type State = 'S' | 'I' | 'P' | 'B' | 'D' | '-'

export type Supervisor = 'S1' | 'S2' | 'S3'

export interface Config {
  workDays: number
  restDays: number
  inductionDays: number
  totalPerforation: number
}

export interface Schedule {
  [key: string]: State[]
}

export interface ErrorItem {
  day: number
  perforando: number
}
