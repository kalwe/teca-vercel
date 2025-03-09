import ContractForm from '@/app/components/display/contract-form'
import { EmployeeService } from '@/app/services/employeeService'
import { Employee } from '@/app/types/employee'
import { Navigation } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default async function Page() {
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams()

  const employeeData: Employee = await EmployeeService.getEmployeeById(Number(id))
  setLoading(false)

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-white text-lg font-semibold'>
          Carregando dados do funcionário...
        </p>
      </div>
    )
  }

  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      <ContractForm employeeData={employeeData} isEditable={true} />
    </div>
  )
}
