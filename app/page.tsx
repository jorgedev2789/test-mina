'use client'

import { useState } from 'react'
import ConfigForm from '@/components/ConfigForm'
import ScheduleTable from '@/components/ScheduleTable'
import { generateSchedule } from '@/lib/generateSchedule'
import { Config, Schedule, ErrorItem } from '@/lib/types'

export default function Home() {
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [errors, setErrors] = useState<ErrorItem[]>([])

  const handleCalculate = (config: Config) => {
    const result = generateSchedule(config)
    setSchedule(result.schedule)
    setErrors(result.errors)
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <header className="bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Cronograma de Supervisores
          </h1>
          <p className="text-slate-500">
            Turnos de perforación
          </p>
        </header>

        <ConfigForm onCalculate={handleCalculate} />

        {schedule && (
          <ScheduleTable schedule={schedule} errors={errors} />
        )}
      </div>
    </main>
  )
}
