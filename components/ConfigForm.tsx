import { useState } from 'react'
import { Config } from '@/lib/types'

interface Props {
  onCalculate: (config: Config) => void
}

export default function ConfigForm({ onCalculate }: Props) {
  const [form, setForm] = useState<Config>({
    workDays: 14,
    restDays: 7,
    inductionDays: 5,
    totalPerforation: 90
  })

  const update = (k: keyof Config, v: number) =>
    setForm({ ...form, [k]: v })

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Configuración</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Días de trabajo */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Días de trabajo</label>
            <input type="number" className="input"
            value={form.workDays}
            onChange={e => update('workDays', +e.target.value)}
            placeholder="Días trabajo (N)" />
        </div>
        {/* Días de descanso */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Días de descanso</label>
            <input type="number" className="input"
            value={form.restDays}
            onChange={e => update('restDays', +e.target.value)}
            placeholder="Días descanso (M)" />
        </div>    
        {/* Días de inducción */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Días de inducción</label>
            <input type="number" className="input"
            value={form.inductionDays}
            onChange={e => update('inductionDays', +e.target.value)}
            placeholder="Inducción" />
        </div>    
        {/* Días totales de perforación */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">
            Días totales de perforación
          </label>
            <input type="number" className="input"
            value={form.totalPerforation}
            onChange={e => update('totalPerforation', +e.target.value)}
            placeholder="Total perforación" />
        </div>
      </div>

      <button
        onClick={() => onCalculate(form)}
        className="mt-4 px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
      >
        Calcular Cronograma
      </button>
    </div>
  )
}
