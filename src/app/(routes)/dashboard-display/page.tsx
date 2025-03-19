import DashboardDisplay from '@/app/components/display/dashboard-display'
import { EmployeeService } from '@/app/services/employeeService'
import { ReminderService } from '@/app/services/reminderService'
import { ResumeService } from '@/app/services/resumeService'
import { VacancyService } from '@/app/services/vacancyService'
import { Employees } from '@/app/types/employee'
import { Reminders } from '@/app/types/reminder'
import { Resumes } from '@/app/types/resume'
import { Vacancies } from '@/app/types/vacancy'

export default async function DashboardPage() {
  const employeesData: Employees = await EmployeeService.getAllEmployees()
  const vacanciesData: Vacancies = await VacancyService.getAllVacancies()
  const remindersData: Reminders = await ReminderService.getAllReminders()
  const resumesData: Resumes = await ResumeService.getAllResumes()

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))'
      }}
      className='h-screen overflow-auto'
    >
      <DashboardDisplay
        employeesData={employeesData}
        vacanciesData={vacanciesData}
        remindersData={remindersData}
        resumesData={resumesData}
      />
    </div>
  )
}
