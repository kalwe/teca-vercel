import ContractForm from '@/app/components/display/contract-form'
import { EmployeeService } from '@/app/services/employeeService'
import { Employee } from '@/app/types/employee'
import { id } from "date-fns/locale"
import { Navigation } from 'lucide-react'

export default async function Page() {


  const employeeData: Employee = await EmployeeService.getEmployeeById(Number(id))


  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      <ContractForm employeeData={employeeData} isEditable={true} />
    </div>
  )
}
