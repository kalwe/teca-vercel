'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxGender from '../DropDown/dropdown-gender'
import DropdownCheckboxMaritalStatus from '../DropDown/dropdown-marital-status'

export function PessoaFisica({ data = {}, onChange, onNext, onPrev }: any) {
  const [person, setPerson] = useState<any>(data || {})

  const formatDateForBackend = (date: any) =>
    date ? date.toISOString().split('T')[0] : ''

  const handleInputChange = (field: any, value: any) => {
    const updatedPerson = {
      ...person,
      [field]:
        field === 'dateOfBirth' && value instanceof Date
          ? formatDateForBackend(value)
          : value
    }
    setPerson(updatedPerson)
    // onChange(updatedPerson)
  }

  return (
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Pessoa Física</h2>
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
            value={person?.[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={`${field.placeholder}`}
            className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          />
        </div>
      ))}

      <div className='w-full'>
        <DatePicker
          selected={person?.dateOfBirth ? new Date(person?.dateOfBirth) : null}
          onChange={(date) => handleInputChange('dateOfBirth', date)}
          dateFormat='dd/MM/yyyy'
          placeholderText='Data de Nascimento'
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
        />
      </div>

      <DropdownCheckboxGender
        value={person?.gender || ''}
        onChange={(val) => handleInputChange('gender', val)}
      />
      <DropdownCheckboxMaritalStatus
        value={person?.maritalStatus || ''}
        onChange={(val) => handleInputChange('maritalStatus', val)}
      />

      <div className='flex justify-between mt-6'>
        <button
          onClick={onPrev}
          className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
