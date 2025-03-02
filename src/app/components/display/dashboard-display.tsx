'use client'

import { Navigation } from '@/app/components/navigation/navigation'
import { EmployeeService } from '@/app/services/employeeService'
import { ReminderService } from '@/app/services/reminderService'
import { VacancyService } from '@/app/services/vacancyService'
import { Employees } from '@/app/types/employee'
import { Reminders } from '@/app/types/reminderType'
import { Vacancies } from '@/app/types/vacancyType'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Layout } from 'react-grid-layout'
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

  const defaultLayout: Layout[] = [
    { i: 'vagas', x: 0, y: 0, w: 3, h: 3 },
    { i: 'funcionario', x: 3, y: 0, w: 3, h: 3 },
    { i: 'banco-de-horas', x: 6, y: 0, w: 3, h: 3 },
    { i: 'curriculos', x: 0, y: 3, w: 6, h: 3 },
    { i: 'lembretes', x: 6, y: 3, w: 6, h: 3 },
    { i: 'adicionar-funcionario', x: 9, y: 0, w: 3, h: 3 },
  ]

  const [layout, setLayout] = useState<Layout[]>(defaultLayout)
  const [isDragging, setIsDragging] = useState(false)
  const dragTimeout = useRef<NodeJS.Timeout | null>(null)

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

  const onMouseDown = () => {
    dragTimeout.current = setTimeout(() => {
      setIsDragging(true)
    }, 2000)
  }

  const onMouseUp = () => {
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current)
      dragTimeout.current = null
    }
    setIsDragging(false)
  }

  const handleNavigation = (path: string) => {
    if (isDragging) {
      return
    }
    router.push(path)
  }

  const maxItemsToShow = 5

  function changePage(path: string): void {
    router.push(path)
  }

  return (
    <div>
      <Navigation />
      <div className="bg-[#4A701C] shadow-lg rounded-xl p-8 mt-24 mx-8 overflow-auto h-full min-h-screen">
        {/* <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          compactType="vertical"
          onLayoutChange={handleLayoutChange}
          useCSSTransforms={false}
          isDroppable={false}
        > */}
        {/* Banco de Horas
          <div
            key="banco-de-horas"
            className="cursor-pointer bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/hoursbank-display/")}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Banco de Horas</h2>
            <ul>
              {loading ? (
              <p className="text-white text-sm">Carregando...</p>
              ) : (
              resumes.length > 0 ? (
                resumes.slice(0, maxItemsToShow).map((resume, index) => (
                  <li key={index}>{resume.fullName} - {resume.position}</li>
                ))
              ) : (
                <p className="text-white text-sm">Nenhum currículo disponível.</p>
              )
            )}
            </ul>
          </div> */}

        {/* Vacancy */}
        <div
          key="vacancy"
          className="cursor-pointer bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
          onClick={() => handleNavigation('/vagas-display/')}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <h2 className="font-semibold text-xl mb-4 text-white">Vagas</h2>
          <ul className="text-white text-sm">
            {!loading ? (
              <p className="text-white text-sm">Carregando...</p>
            ) : vacancies.length > 0 ? (
              vacancies.slice(0, maxItemsToShow).map((vacancy) => (
                <li key={vacancy.id}>
                  {vacancy.position?.name} - Quantidade: {vacancy.quantity}
                </li>
              ))
            ) : (
              <p className="text-white text-sm">Nenhum vaga encontrado.</p>
            )}
          </ul>
        </div>

        {/* Funcionários */}
        <div
          key="funcionario"
          className="cursor-pointer bg-gradient-to-br from-[#4A701C] to-[#88B257] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
          onClick={() => handleNavigation('/contract-display/employee/')}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <h2 className="font-semibold text-xl mb-4 text-white">Funcionários</h2>
          <ul className="text-white text-sm">
            {!loading ? (
              <p className="text-white text-sm">Carregando...</p>
            ) : employees.length > 0 ? (
              employees.slice(0, maxItemsToShow).map((employee) => (
                <li key={employee.id}>
                  {employee.name} - {employee.position?.name || 'Sem função'}
                </li>
              ))
            ) : (
              <p className="text-white text-sm">Nenhum funcionário encontrado.</p>
            )}
          </ul>
        </div>

        {/* Currículos */}
        {/* <div
            key="curriculos"
            className="cursor-pointer bg-gradient-to-br from-[#284703] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/curriculo-display/visualize-cv")}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Currículos</h2>
            <ul className="text-white text-sm">
              {loading ? (
                <p className="text-white text-sm">Carregando...</p>
              ) : (
                resumes.length > 0 ? (
                  resumes.slice(0, maxItemsToShow).map((resume, index) => (
                    <li key={index}>{resume.full_name} - {resume.position}</li>
                  ))
                ) : (
                  <p className="text-white text-sm">Nenhum currículo disponível.</p>
                )
              )}
            </ul>
          </div> */}

        {/* Lembretes */}
        <div
          key="lembretes"
          className="cursor-pointer bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
          onClick={() => handleNavigation('/reminder-display/')}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <h2 className="font-semibold text-xl mb-4 text-white">Lembretes</h2>
          <ul className="text-white text-sm">
            {!loading ? (
              <p className="text-white text-sm">Carregando...</p>
            ) : reminders.length > 0 ? (
              reminders.slice(0, maxItemsToShow).map((reminder) => (
                <li key={reminder.id}>
                  {reminder.reason} - {reminder.date}
                </li>
              ))
            ) : (
              <p className="text-white text-sm">Nenhum lembrete cadastrado.</p>
            )}
          </ul>
        </div>

        {/* Buttons to Add Employee/User */}
        <div
          key="adicionar-funcionario"
          className="bg-gradient-to-br from-[#88B257] to-[#4A701C] rounded-2xl flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
        >
          <button
            className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-6 py-3 rounded-full font-bold text-lg shadow-md mb-4"
            onClick={() => changePage('/contract-display/')}
          >
            Adicionar Funcionário
          </button>
          <button
            className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-6 py-3 rounded-full font-bold text-lg shadow-md"
            onClick={() => changePage('/user-display/')}
          >
            Adicionar Usuário
          </button>
        </div>
        {/* </ResponsiveGridLayout> */}
      </div>
    </div>
  )
}
