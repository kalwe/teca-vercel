"use client"

import ContractForm from "@/app/components/display/contract-form"
import { EmployeeService } from "@/app/services/employeeService"
import { EmployeeType } from "@/app/types/employee"
import { Navigation } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function EmployeeDetailPage() {
  const [formData, setFormData] = useState<EmployeeType>()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { id } = useParams() // Captura o ID da URL


  const fetchEmployee = async (employeeId: number) => {
    try {

      const employeeData = await EmployeeService.getEmployeeById(employeeId)

      if (employeeData) {
        setFormData(employeeData)
      }
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error)
      alert("Erro ao carregar dados do funcionário. Tente novamente.")
      router.replace("/contract-display/employee")
    } finally {
      setLoading(false)
    }
  }
fetchEmployee(Number(id))

const handleSave = async (updatedData: EmployeeType) => {
    setLoading(true)
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(Number(updatedData.id), updatedData)
      console.log(updatedEmployee)
      alert("Funcionário atualizado com sucesso.")
      router.push("/contract-display/employee")
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error)
      alert("Erro ao atualizar funcionário. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/contract-display/employee")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg font-semibold">Carregando dados do funcionário...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      {formData && (
        <ContractForm
          mode="edit"
          employeeData={formData}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditable={true}
        />
      )}
    </div>
  )
}
