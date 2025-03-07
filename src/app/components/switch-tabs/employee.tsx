'use client'

import { EmployeeService } from '@/app/services/employeeService'
import { ContractFormProps, Employee } from '@/app/types/employee'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export default function EmployeeForm({
  employeeData = undefined,
  isEditable
}: ContractFormProps) {
  const [employee, setEmployee] = useState<Employee | undefined>(employeeData)
  const handleInputChange = (field: keyof Employee, value: any) => {
    setEmployee(employee.map((e) => {
      return {  }
    }))
  }

  const valueFromField = (field: string, obj: Object) => {
    const val = Object.entries(obj).filter((key, value) => {
      return String(key) == field ? value : ''
    })
    return val
  }

  const handleSave = async () => {
    try {
      const createdEmployee = await EmployeeService.createEmployee(employee)
      console.log('Funcionário cadastrado com sucesso:', createdEmployee)
    } catch (error) {
      alert('Erro ao cadastrar funcionário.')
      console.error('Erro ao enviar para API:', error)
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Funcionário</h2>

      {/* Campo de Matrícula */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Digite a matrícula</label>
        <input
          type="text"
          name="registration"
          value={employee?.registration || ''}
          onChange={(e) => handleInputChange('registration', e.target.value)}
          placeholder="Digite a matrícula"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Campo de Employee de Admissão */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Employee de Admissão</label>
        <DatePicker
          selected={employee?.contractDate ? new Date(employee.contractDate) : null}
          onChange={(date: Date | null) =>
            handleInputChange('contractDate', date?.toISOString())
          }
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Campo de Employee de Remoção */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Employee de Remoção</label>
        <DatePicker
          selected={employee?.removalDate ? new Date(employee.removalDate) : null}
          onChange={(date: Date | null) =>
            handleInputChange('removalDate', date?.toISOString())
          }
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Dropdown para Seleção de Cargo */}
      <div>
        <DropdownCheckboxPosition
          id={employee?.positionId ?? 1}
          onChange={() => handleInputChange('positionId', id)}
        />
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Voltar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
