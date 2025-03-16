import ContractForm from '@/app/components/display/contract-form'
import { EmployeeService } from '@/app/services/employeeService'
import { Employee } from '@/app/types/employee'
import { Navigation } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  // needs to be on server
  title: 'Presentation'
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  console.log(id)
  const employeeData: Employee = await EmployeeService.getEmployeeById(Number(id))
  console.log(employeeData)

  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      <ContractForm data={employeeData} isEditable={true} />
    </div>
  )
}
