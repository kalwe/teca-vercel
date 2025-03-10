'use clinet'

import DashboardDisplay from '@/app/components/display/dashboard-display'
import { EmployeeService } from '@/app/services/employeeService'
import { ReminderService } from '@/app/services/reminderService'
import { VacancyService } from '@/app/services/vacancyService'
import { Employees } from '@/app/types/employee'
import { Reminders } from '@/app/types/reminder'
import { Vacancies } from '@/app/types/vacancy'

export default async function Page() {
  const employees: Employees = await EmployeeService.getAllEmployees()
  const vacancies: Vacancies = await VacancyService.getAllVacancies()
  const reminders: Reminders = await ReminderService.getAllReminders()

  return (
    <div
      className="p-0 overflow-auto h-screen"
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))'
      }}
    >
      <DashboardDisplay
        employeesData={employees}
        vacanciesData={vacancies}
        remindersData={reminders}
      />
    </div>
  )
}
