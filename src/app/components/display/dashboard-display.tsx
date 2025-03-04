'use client'

import { Navigation } from '@/app/components/navigation/navigation'
import { EmployeeService } from '@/app/services/employeeService'
import { ReminderService } from '@/app/services/reminderService'
import { VacancyService } from '@/app/services/vacancyService'
import { Employees } from '@/app/types/employee'
import { Reminders } from '@/app/types/reminderType'
import { Vacancies } from '@/app/types/vacancyType'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { useRef } from 'react'
// import { Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default function DashboardDisplay() {
  // const ResponsiveGridLayout = WidthProvider(Responsive);
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchData, setFetchData] = useState(true)
  const [employees, setEmployees] = useState<Employees>([])
  const [vacancies, setVacancies] = useState<Vacancies>([])
  const [reminders, setReminders] = useState<Reminders>([])

  // const defaultLayout: Layout[] = [
  //   { i: 'vagas', x: 0, y: 0, w: 3, h: 3 },
  //   { i: 'funcionario', x: 3, y: 0, w: 3, h: 3 },
  //   { i: 'banco-de-horas', x: 6, y: 0, w: 3, h: 3 },
  //   { i: 'curriculos', x: 0, y: 3, w: 6, h: 3 },
  //   { i: 'lembretes', x: 6, y: 3, w: 6, h: 3 },
  //   { i: 'adicionar-funcionario', x: 9, y: 0, w: 3, h: 3 },
  // ]

  // TODO: remover tudo se nao usa
  // const [layout, setLayout] = useState<Layout[]>(defaultLayout)
  // const [isDragging, setIsDragging] = useState(false)
  // const dragTimeout = useRef<NodeJS.Timeout | null>(null)

  const fetchingData = async () => {
    try {
      const employeesData: Employees = await EmployeeService.getAllEmployees()
      const vacanciesData: Vacancies = await VacancyService.getAllVacancies()
      const remindersData: Reminders = await ReminderService.getAllReminders()

      setEmployees(employeesData)
      setVacancies(vacanciesData)
      setReminders(remindersData)
    } catch (err) {
      console.error('Erro ao carregar os dados do dashboard:', err)
    } finally {
      setLoading(false)
      setFetchData(false)
    }
  }
  if (fetchData) {
    fetchingData()
  }

  const maxItemsToShow = 5

  return (
    <div className="bg-[#121D14] min-h-screen text-white transition-all">
      <Navigation />
      {/* Container principal */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-12 bg-[#121D14]">
        <Navigation />

        {/* Grid de Cards */}
        <div className="grid gap-8 w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DashboardWidget
            title="Funcionários"
            data={employees}
            maxItems={maxItemsToShow}
            navigateTo="/contract-display/employee/"
            loading={loading}
            bgGradient="from-[#243A28] to-[#18231A]"
          />
          <DashboardWidget
            title="Vagas"
            data={vacancies}
            maxItems={maxItemsToShow}
            navigateTo="/vagas-display/"
            loading={loading}
            bgGradient="from-[#2A4231] to-[#1C2B21]"
          />
          <DashboardWidget
            title="Lembretes"
            data={reminders}
            maxItems={maxItemsToShow}
            navigateTo="/reminder-display/"
            loading={loading}
            bgGradient="from-[#314B38] to-[#203225]"
          />
          {/* <DashboardWidget
            title="Currículos"
            data={resumes}
            maxItems={maxItemsToShow}
            navigateTo="/curriculo-display/"
            loading={loading}
            bgGradient="from-[#3A3B38] to-[#2B2C25]"
          /> */}
        </div>

        {/* Card de Ações Rápidas - Ocupando bem o espaço */}
        <div className="bg-[#203225] p-10 rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-6 w-full max-w-3xl mt-12">
          <h2 className="text-4xl font-bold text-[#C8DAC5]">Ações Rápidas</h2>
          <button
            onClick={() => router.push('/contract-display/')}
            className="w-full py-4 bg-[#2D4A33] hover:bg-[#243A28] rounded-xl text-white font-semibold text-lg transition-all shadow-md hover:shadow-lg"
          >
            Adicionar Funcionário
          </button>
          <button
            onClick={() => router.push('/user-display/')}
            className="w-full py-4 bg-[#2B4531] hover:bg-[#203225] rounded-xl text-white font-semibold text-lg transition-all shadow-md hover:shadow-lg"
          >
            Adicionar Usuário
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Componente do Widget do Dashboard
 */
interface DashboardWidgetProps {
  title: string
  data: any[] // cria um type juntando os types ex: type Data = Employees | Vacancies | Reminders
  maxItems: number
  navigateTo: string
  loading: boolean
  bgGradient: string
}

// TODO: move o componete pra um arquivo separado
function DashboardWidget({
  title,
  data,
  maxItems,
  navigateTo,
  loading,
  bgGradient,
}: DashboardWidgetProps) {
  const router = useRouter()

  return (
    <div
      className={`p-10 rounded-2xl shadow-2xl bg-gradient-to-br ${bgGradient} transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between animate-slideIn`}
      onClick={() => router.push(navigateTo)}
    >
      <h2 className="text-3xl font-semibold mb-6 text-[#C8DAC5]">{title}</h2>
      {loading ? (
        <p className="text-gray-400 text-lg animate-pulse">Carregando...</p>
      ) : data.length > 0 ? (
        <ul className="text-gray-300 text-lg space-y-3">
          {data.slice(0, maxItems).map((item, index) => (
            <li key={index} className="hover:text-[#A8C5A8] transition-all text-xl">
              {/* TODO: isso nao vai bugar pois somente alguns items tem position e reason */}
              {item.name || item.position || item.reason}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">Nenhum dado encontrado.</p>
      )}
    </div>
  )
}
