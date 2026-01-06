import { Config, Schedule, State, ErrorItem } from './types'

type Supervisor = 'S1' | 'S2' | 'S3'

interface InternalState {
  phase: State
  phaseDay: number
  active: boolean
}

export function generateSchedule(config: Config): {
  schedule: Schedule
  errors: ErrorItem[]
} {
  const { workDays, restDays, inductionDays, totalPerforation } = config

  const descansoReal = restDays - 2

  const supervisors: Supervisor[] = ['S1', 'S2', 'S3']

  const internal: Record<Supervisor, InternalState> = {
    S1: { phase: 'S', phaseDay: 0, active: true },
    S2: { phase: 'S', phaseDay: 0, active: true },
    S3: { phase: '-', phaseDay: 0, active: false }
  }

  const schedule: Schedule = { S1: [], S2: [], S3: [] }
  const errors: ErrorItem[] = []

  let day = 0
  let totalP = 0

  // Día de bajada de S1
  const s1Bajada = 1 + workDays
  // Día de entrada de S3
  const s3Entrada = s1Bajada - inductionDays - 1

  while (totalP < totalPerforation) {
    // Activar S3
    if (day === s3Entrada) {
      internal.S3 = { phase: 'S', phaseDay: 0, active: true }
    }

    // Avanzar estados
    supervisors.forEach(s => {
      const st = internal[s]
      if (!st.active) {
        schedule[s].push('-')
        return
      }

      schedule[s].push(st.phase)
      advanceState(st, workDays, inductionDays, descansoReal)
    })

    const perforando = supervisors.filter(
      s => schedule[s][day] === 'P'
    ).length

    if (perforando !== 2 && day > 0) {
      errors.push({ day, perforando })
      corregirDia(schedule, internal, day)
    }

    totalP += perforando
    day++
  }

  return { schedule, errors }
}


function advanceState(
  st: any,
  workDays: number,
  inductionDays: number,
  descansoReal: number
) {
  st.phaseDay++

  switch (st.phase) {
    case 'S':
      st.phase = inductionDays > 0 ? 'I' : 'P'
      st.phaseDay = 0
      break

    case 'I':
      if (st.phaseDay >= inductionDays) {
        st.phase = 'P'
        st.phaseDay = 0
      }
      break

    case 'P':
      if (st.phaseDay >= workDays - inductionDays) {
        st.phase = 'B'
        st.phaseDay = 0
      }
      break

    case 'B':
      st.phase = 'D'
      st.phaseDay = 0
      break

    case 'D':
      if (st.phaseDay >= descansoReal) {
        st.phase = 'S'
        st.phaseDay = 0
      }
      break
  }
}

function corregirDia(
  schedule: Schedule,
  internal: any,
  day: number
) {
  const activos = ['S2', 'S3'] as const

  activos.forEach(s => {
    if (schedule[s][day] === 'P') {
      internal[s].phase = 'B'
      internal[s].phaseDay = 0
    }
  })
}
