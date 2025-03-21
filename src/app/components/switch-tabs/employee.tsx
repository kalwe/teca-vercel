'use client'

import { EmployeeService } from '@/app/services/employeeService'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxGender from '../DropDown/dropdown-gender'
import DropdownCheckboxMaritalStatus from '../DropDown/dropdown-marital-status'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export function EmployeeForm({ employeeData = {}, onPrev, onNext }: any) {
  const [employee, setEmployee] = useState<any>(employeeData || {})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (employeeData && Object.keys(employeeData).length > 0) {
      setEmployee(employeeData)
    }
  }, [employeeData])

  const handleInputChange = (field: any, value: any) => {
    setEmployee((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)

      const id = employee?.id
      const payload = { ...employee }

      if (id) {
        await EmployeeService.updateEmployee(id, payload)
      } else {
        const created = await EmployeeService.createEmployee(payload)
        setEmployee(created)
        localStorage.setItem('employeeId', created.id)
      }

      alert('Funcionário salvo com sucesso!')
      onNext()
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error)
      alert('Erro ao salvar funcionário. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Funcionário</h2>
      {[
        { name: 'name', placeholder: 'Digite o nome', label: 'Nome' },
        {
          name: 'fullName',
          placeholder: 'Digite o Nome Completo',
          label: 'Nome Completo'
        },
        { name: 'taxId', placeholder: 'Digite o CPF', label: 'CPF' },
        { name: 'nationalId', placeholder: 'Digite o RG', label: 'RG' },
        {
          name: 'issuingBody',
          placeholder: 'Digite o Órgão Expedidor',
          label: 'Órgão Expedidor'
        }
      ].map((field) => (
        <div key={field.name} className='w-full'>
          <input
            type='text'
            name={field.name}
            value={employee?.[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={`${field.placeholder}`}
            className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          />
        </div>
      ))}

      <div className='w-full'>
        <DatePicker
          selected={employee?.dateOfBirth ? new Date(employee?.dateOfBirth) : null}
          onChange={(date) => handleInputChange('dateOfBirth', date)}
          dateFormat='dd/MM/yyyy'
          placeholderText='Data de Nascimento'
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
        />
      </div>

      <div className='flex-auto'>
        <DropdownCheckboxGender
          value={employee?.gender || ''}
          onChange={(val) => handleInputChange('gender', val)}
        />
      </div>
      <div className='flex-auto'>
        <DropdownCheckboxMaritalStatus
          value={employee?.maritalStatus || ''}
          onChange={(val) => handleInputChange('maritalStatus', val)}
        />
      </div>

      <div className='w-full'>
        <label className='block text-gray-400 mb-2'>Digite a matrícula</label>
        <input
          type='text'
          name='registration'
          value={employee?.registration || ''}
          onChange={(e) => handleInputChange('registration', e.target.value)}
          placeholder='Digite a matrícula'
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
        />
      </div>

      {/* Cargo */}
      <div>
        <DropdownCheckboxPosition
          id={employee?.positionId ?? 1}
          onChange={(val: any) => handleInputChange('positionId', val)}
        />
      </div>

      {/* Botões */}
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
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </button>
      </div>
    </div>
  )
}
