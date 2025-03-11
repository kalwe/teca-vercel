'use client'

import { personSchema } from '@/app/schemas/personSchema'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { z } from 'zod'
import DropdownCheckboxGender from '../DropDown/dropdown-gender'
import DropdownCheckboxMaritalStatus from '../DropDown/dropdown-marital-status'

export function PessoaFisica({ data = {}, onChange, isEditable, onNext, onPrev }: any) {
  const [person, setPerson] = useState<any>(data || {})
  const [errors, setErrors] = useState<any>({})
  const [isNextEnabled, setIsNextEnabled] = useState(false)

  const formatDateForBackend = (date: any) =>
    date ? date.toISOString().split('T')[0] : ''

  const handleInputChange = (field: any, value: any) => {
    const updatedPerson = {
      ...person,
      [field]: field === 'dateOfBirth' && value instanceof Date ? formatDateForBackend(value) : value
    }
    setPerson(updatedPerson)
    onChange(updatedPerson)

    try {
      personSchema.parse(updatedPerson)
      setErrors({})
      setIsNextEnabled(true)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.errors.reduce((acc: any, e: any) => ({ ...acc, [e.path[0]]: e.message }), {}))
        setIsNextEnabled(false)
      }
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Pessoa Física</h2>
      {['name', 'fullName', 'taxId', 'nationalId', 'issuingBody'].map((field) => (
        <div key={field} className="w-full">
          <input
            type="text"
            name={field}
            value={person?.[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={`Digite ${field}`}
            className={`w-full bg-gray-700 text-white border ${errors[field] ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3`}
            disabled={!isEditable}
          />
          {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
      ))}

      <div className="w-full">
        <DatePicker
          selected={person?.dateOfBirth ? new Date(person.dateOfBirth) : null}
          onChange={(date) => handleInputChange('dateOfBirth', date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Nascimento"
          className={`w-full bg-gray-700 text-white border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
      </div>

      <DropdownCheckboxGender value={person?.gender || ''} onChange={(val) => handleInputChange('gender', val)} disabled={!isEditable} />
      {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}

      <DropdownCheckboxMaritalStatus value={person?.maritalStatus || ''} onChange={(val) => handleInputChange('maritalStatus', val)} disabled={!isEditable} />
      {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Voltar</button>
        <button onClick={onNext} disabled={!isNextEnabled} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Próximo</button>
      </div>
    </div>
  )
}
