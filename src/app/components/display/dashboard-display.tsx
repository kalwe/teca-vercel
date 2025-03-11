'use client'

import { Navigation } from '@/app/components/navigation/navigation'
import { Employees } from '@/app/types/employee'
import { Reminders } from '@/app/types/reminder'
import { Resumes } from '@/app/types/resume'
import { Vacancies } from '@/app/types/vacancy'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { DashboardWidget } from '../dashboardWidget/dashboard-widget'

export default function DashboardDisplay({
  employeesData,
  vacanciesData,
  remindersData,
  resumesData
}: {
  employeesData: Employees
  vacanciesData: Vacancies
  remindersData: Reminders
  resumesData: Resumes
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState<Employees>([])
  const [vacancies, setVacancies] = useState<Vacancies>([])
  const [reminders, setReminders] = useState<Reminders>([])
  const [resumes, setResumes] = useState<Resumes>([])

  useEffect(() => {
    if (loading) {
      setEmployees(employeesData ?? []) // Garante que não seja undefined
      setVacancies(vacanciesData ?? [])
      setReminders(remindersData ?? [])
      setResumes(resumesData ?? [])
    }
    setLoading(false)
  }, [loading, employeesData, vacanciesData, remindersData, resumesData])

  const maxItemsToShow = 5

  return (
    <div className='bg-[#121D14] min-h-screen text-white transition-all'>
      <Navigation />
      {/* Container principal */}
      <div className='flex flex-col items-center justify-center min-h-screen px-8 py-12 bg-[#121D14]'>
        <Navigation />

        {/* Grid de Cards */}
        <div className='grid gap-8 w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          <DashboardWidget
            title='Funcionários'
            data={employees.map((e) => {
              return {
                name: e.name || '',
                misc: e.position?.name || ''
              }
            })}
            maxItems={maxItemsToShow}
            navigateTo='/contract-display/employee/'
            loading={loading}
            bgGradient='from-[#243A28] to-[#18231A]'
          />
          <DashboardWidget
            title='Vagas'
            data={vacancies.map((v) => {
              return {
                name: v.position?.name || '',
                misc: String(v.quantity)
              }
            })}
            maxItems={maxItemsToShow}
            navigateTo='/vacancy-display/'
            loading={loading}
            bgGradient='from-[#2A4231] to-[#1C2B21]'
          />
          <DashboardWidget
            title='Lembretes'
            data={reminders.map((r) => {
              return {
                name: r.reason,
                misc: r.date
              }
            })}
            maxItems={maxItemsToShow}
            navigateTo='/reminder-display/'
            loading={loading}
            bgGradient='from-[#314B38] to-[#203225]'
          />
          <DashboardWidget
            title='Currículos'
            data={(resumes ?? []).map((d) => ({
              name: d.fullName || '',
              misc: d.position
            }))}
            maxItems={maxItemsToShow}
            navigateTo='/curriculo-display/visualize-cv'
            loading={loading}
            bgGradient='from-[#3A3B38] to-[#2B2C25]'
          />

        </div>

        {/* Card de Ações Rápidas - Ocupando bem o espaço */}
        <div className='bg-[#203225] p-10 rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-6 w-full max-w-3xl mt-12'>
          <h2 className='text-4xl font-bold text-[#C8DAC5]'>Ações Rápidas</h2>
          <button
            onClick={() => router.push('/contract-display/')}
            className='w-full py-4 bg-[#2D4A33] hover:bg-[#243A28] rounded-xl text-white font-semibold text-lg transition-all shadow-md hover:shadow-lg'
          >
            Adicionar Funcionário
          </button>
          <button
            onClick={() => router.push('/user-display/')}
            className='w-full py-4 bg-[#2B4531] hover:bg-[#203225] rounded-xl text-white font-semibold text-lg transition-all shadow-md hover:shadow-lg'
          >
            Adicionar Usuário
          </button>
        </div>
      </div>
    </div>
  )
}
