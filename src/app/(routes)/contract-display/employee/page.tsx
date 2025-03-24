import '../style.css'

import ComebackButton from '@/app/components/button/comeback'
import EmployeesDisplay from '@/app/components/display/registered-employees'
import { Navigation } from '@/app/components/navigation/navigation'
import { EmployeeService } from '@/app/services/employeeService'
import { Employees } from '@/app/types/employee'

export default async function Page() {
  const employeesData: Employees = await EmployeeService.getAllEmployees()

  return (
    <div>
      <Navigation />
      <EmployeesDisplay employeesData={employeesData} />
      <ComebackButton />
    </div>
  )
}
