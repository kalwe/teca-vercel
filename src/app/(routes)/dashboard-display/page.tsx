'use client'

import DashboardDisplay from "@/app/components/display/dashboard-display"
import { EmployeeService } from '@/app/services/employeeService'
import { ReminderService } from '@/app/services/reminderService'
import { VacancyService } from '@/app/services/vacancyService'
import { Employees } from '@/app/types/employee'
import { Reminders } from '@/app/types/reminder'
import { Vacancies } from '@/app/types/vacancy'
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employees>([])
  const [vacancies, setVacancies] = useState<Vacancies>([])
  const [reminders, setReminders] = useState<Reminders>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [employeesData, vacanciesData, remindersData] = await Promise.all([
          EmployeeService.getAllEmployees(),
          VacancyService.getAllVacancies(),
          ReminderService.getAllReminders()
        ])

        setEmployees(employeesData || [])
        setVacancies(vacanciesData || [])
        setReminders(remindersData || [])
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))'
      }}
      className="h-screen overflow-auto"
    >
      <DashboardDisplay
        employeesData={employees}
        vacanciesData={vacancies}
        remindersData={reminders} resumesData={[]}      />
    </div>
  )
}
