'use client'

import { EmployeeService } from '@/app/services/employeeService'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export default function EmployeeForm({ employeeData = {}, isEditable, onPrev }: any) {
  const [employee, setEmployee] = useState<any>(employeeData || {})

  const handleInputChange = (field: any, value: any) => {
    setEmployee((prev: any) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    setEmployee(employeeData || {})
  }, [employeeData])

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
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Funcionário</h2>
      <div className='w-full'>
        <label className='block text-gray-400 mb-2'>Digite a matrícula</label>
        <input
          type='text'
          name='registration'
          value={employee?.registration || ''}
          onChange={(e) => handleInputChange('registration', e.target.value)}
          placeholder='Digite a matrícula'
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          disabled={!isEditable}
        />
      </div>

      <div className='w-full'>
        <label className='block text-gray-400 mb-2'>Data de Admissão</label>
        <DatePicker
          selected={employee?.contractDate ? new Date(employee.contractDate) : null}
          onChange={(date) => handleInputChange('contractDate', date)}
          dateFormat='yyyy-MM-dd'
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          disabled={!isEditable}
        />
      </div>

      <div className='w-full'>
        <label className='block text-gray-400 mb-2'>Data de Remoção</label>
        <DatePicker
          selected={employee?.removalDate ? new Date(employee.removalDate) : null}
          onChange={(date) => handleInputChange('removalDate', date)}
          dateFormat='yyyy-MM-dd'
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          disabled={!isEditable}
        />
      </div>

      <div>
        <DropdownCheckboxPosition
          id={employee?.positionId ?? 1}
          onChange={(val: any) => handleInputChange('positionId', val)}
        />
      </div>

      <div className='flex justify-between mt-6'>
        <button
          onClick={onPrev}
          className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
        >
          Voltar
        </button>
        <button
          onClick={handleSave}
          className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
