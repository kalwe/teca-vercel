import ContractForm from '@/app/components/display/contract-form'
import { EmployeeService } from '@/app/services/employeeService'
import { Employee } from '@/app/types/employee'
import { Navigation } from 'lucide-react'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  const employeeData: Employee = await EmployeeService.getEmployeeById(Number(id))

  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      <ContractForm data={employeeData} isEditable={true} />
    </div>
  )
}
