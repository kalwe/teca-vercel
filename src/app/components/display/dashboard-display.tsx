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
      setLoading(true)
      setFetchData(false)
    }
  }
  if (fetchData) {
    fetchingData()
  }

  // TODO: remover se nao usa
  //   const onMouseDown = () => {
  //     dragTimeout.current = setTimeout(() => {
  //       setIsDragging(true)
  //     }, 2000)
  //   }

  // TODO: remover se nao usa
  //   const onMouseUp = () => {
  //     if (dragTimeout.current) {
  //       clearTimeout(dragTimeout.current)
  //       dragTimeout.current = null
  //     }
  //     setIsDragging(false)
  //   }

  // TODO: remover se nao usa
  // const handleNavigation = (path: string) => {
  //   if (isDragging) {
  //     return
  //   }
  //   router.push(path)
  // }

  const maxItemsToShow = 5

  // TODO: remover se nao usa
  // function changePage(path: string): void {
  //   router.push(path)
  // }

  return (
    <div className="bg-[#1C2A21] min-h-screen text-white">
      <Navigation />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">Dashboard</h1>

        {/* Grid de Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <DashboardWidget
            title="Funcionários"
            data={employees}
            maxItems={maxItemsToShow}
            navigateTo="/contract-display/employee/"
            loading={loading}
            bgGradient="from-[#2F3E34] to-[#1E2922]"
          />
          <DashboardWidget
            title="Vagas"
            data={vacancies}
            maxItems={maxItemsToShow}
            navigateTo="/vagas-display/"
            loading={loading}
            bgGradient="from-[#374E3F] to-[#2A3A2E]"
          />
          {/* TODO: remover nao teremos hours bank por enquanto */}
          <DashboardWidget
            title="Banco de Horas"
            data={hoursBank}
            maxItems={maxItemsToShow}
            navigateTo="/hoursbank-display/"
            loading={loading}
            bgGradient="from-[#435A4C] to-[#2C3E35]"
          />
          {/* TODO: deixa o widge comentado ate trazer os dados de resume da api */}
          <DashboardWidget
            title="Currículos"
            data={resumes}
            maxItems={maxItemsToShow}
            navigateTo="/curriculo-display/visualize-cv"
            loading={loading}
            bgGradient="from-[#3A5243] to-[#2B3A31]"
          />
          <DashboardWidget
            title="Lembretes"
            data={reminders}
            maxItems={maxItemsToShow}
            navigateTo="/reminder-display/"
            loading={loading}
            bgGradient="from-[#314730] to-[#1E2B1D]"
          />

          {/* Ações Rápidas */}
          <div className="bg-[#1E2922] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center space-y-4 transform transition duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-300">Ações Rápidas</h2>
            <button
              onClick={() => router.push('/contract-display/')}
              className="px-4 py-2 bg-[#3B5E3E] hover:bg-[#2E4A32] rounded-lg w-full text-white transition-all"
            >
              Adicionar Funcionário
            </button>
            <button
              onClick={() => router.push('/user-display/')}
              className="px-4 py-2 bg-[#2F4A30] hover:bg-[#253B26] rounded-lg w-full text-white transition-all"
            >
              Adicionar Usuário
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Widget do Dashboard
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
      className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${bgGradient} transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between`}
      onClick={() => router.push(navigateTo)}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-300">{title}</h2>
      {loading ? (
        <p className="text-gray-400 text-sm">Carregando...</p>
      ) : data.length > 0 ? (
        <ul className="text-gray-300 text-sm space-y-1">
          {data.slice(0, maxItems).map((item, index) => (
            // TODO: isso nao vai bugar pois somente alguns items tem position e reason
            <li key={index}>{item.name || item.position || item.reason}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">Nenhum dado encontrado.</p>
      )}
    </div>
  )
}
