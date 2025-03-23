import ContractForm from '@/app/components/display/contract-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { EmployeeService } from '@/app/services/employeeService'
import { Employee } from '@/app/types/employee'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  const employeeData: Employee = await EmployeeService.getEmployeeById(Number(id))

  return (
    <div className='bg-gradient-to-br from-[#0B140B] to-[#4F7452] min-h-screen relative'>
      <Navigation />
      <ContractForm data={employeeData} />
    </div>
  )
}
