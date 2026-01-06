import { Schedule, State, ErrorItem } from '@/lib/types'

interface Props {
  schedule: Schedule
  errors: ErrorItem[]
}

const COLORS: Record<State, string> = {
  S: 'bg-blue-500',
  I: 'bg-amber-400',
  P: 'bg-emerald-500',
  B: 'bg-red-500',
  D: 'bg-gray-400',
  '-': 'bg-white'
}

export default function ScheduleTable({ schedule }: Props) {
  const days = schedule.S1.length

  const perforadores = Array.from({ length: days }, (_, d) =>
    ['S1','S2','S3']
      .filter(s => schedule[s][d] === 'P').length
  )

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <table className="border-collapse">
        <tbody>
            {/* FILA DE DIAS */}
        <tr className="bg-gray-100 font-mono">
          <td className="border p-1 font-bold w-12">Dia:</td>
          {schedule.S1.map((_: string, i: number) => (
            <td
              key={i}
              className="border p-1 text-center w-10"
            >
              {i}
            </td>
          ))}
        </tr>
          {(['S1','S2','S3'] as const).map(s => (
            <tr key={s}>
              <td className="sticky left-0 bg-white font-semibold p-2">
                {s}
              </td>
              {schedule[s].map((v,i)=>(
                <td key={i}
                  className={`w-8 h-8 text-xs text-center font-bold text-white ${COLORS[v]}`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td className="sticky left-0 bg-white font-bold p-2">#P</td>
            {perforadores.map((n,i)=>(
              <td key={i}
                className={`text-center font-bold
                  ${n !== 2 ? 'bg-red-200 text-red-800' : 'bg-emerald-200 text-emerald-800'}`}>
                {n}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
