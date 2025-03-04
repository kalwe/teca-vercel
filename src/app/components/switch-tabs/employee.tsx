'use client'

import { EmployeeService } from '@/app/services/employeeService'
import { EmployeeProps, EmployeeType } from '@/app/types/employee'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export function Funcionario({
  data = {} as EmployeeType,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: EmployeeProps) {
g

  const handleInputChange = (field: string, value: unknown) => {
    const updatedData = { ...data, [field]: value }
    onChange(updatedData)
  }

  const handleSave = async () => {
    try {

      const createdEmployee = await EmployeeService.createEmployee(data)
      console.log('Funcionário cadastrado com sucesso:', createdEmployee)
      onNext()
    } catch (error) {
      alert('Erro ao cadastrar funcionário.')
      console.error('Erro ao enviar para API:', error)

      if (error.response) {
        console.log(' Resposta da API:', error.response.data)
      }
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Funcionário</h2>

      {/* Registration Field */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Digite a matrícula</label>
        <input
          type="text"
          name="registration"
          value={data.registration || ''}
          onChange={(e) => handleInputChange('registration', e.target.value)}
          placeholder="Digite a matrícula"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Contract Date Field with DatePicker */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <DatePicker
          selected={data.contractDate ? new Date(data.contractDate) : null}
          onChange={(date: Date | null) =>
            handleInputChange('contractDate', date?.toISOString())
          }
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Removal Date Field with DatePicker */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Remoção</label>
        <DatePicker
          selected={data.removalDate ? new Date(data.removalDate) : null}
          onChange={(date: Date | null) =>
            handleInputChange('removalDate', date?.toISOString())
          }
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Dropdown for Position */}
      <div>
        <DropdownCheckboxPosition
          value={data.positionId ?? 1}
          onChange={(value) => handleInputChange('positionId', value)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Voltar
        </button>
        <button
          // TODO: arruma INDENTACAO
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
