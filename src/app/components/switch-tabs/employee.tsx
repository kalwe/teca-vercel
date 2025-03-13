'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export default function EmployeeForm({ employeeData = {}, onPrev }: any) {
  const [employee, setEmployee] = useState<any>(employeeData || {})
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isSupervisor, setIsSupervisor] = useState<boolean>(employeeData?.isSupervisor || false)

  const handleInputChange = (field: string, value: any) => {
    setEmployee((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setUploadedFile(file)
      console.log(`Arquivo anexado:`, file.name)
    }
  }

  const handleSupervisorChange = () => {
    setIsSupervisor((prev) => {
      const newValue = !prev
      handleInputChange('isSupervisor', newValue)
      return newValue
    })
  }

  return (
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Funcionário</h2>

      {/* Matrícula */}
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

      {/* Data de Admissão */}
      <div className='w-full'>
        <label className='block text-gray-400 mb-2'>Data de Admissão</label>
        <DatePicker
          selected={employee?.contractDate ? new Date(employee.contractDate) : null}
          onChange={(date) => handleInputChange('contractDate', date)}
          dateFormat='yyyy-MM-dd'
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
        />
      </div>

      {/* Data de Remoção */}


      {/* Cargo */}
      <div>
        <DropdownCheckboxPosition
          id={employee?.positionId ?? 1}
          onChange={(val: any) => handleInputChange('positionId', val)}
        />
      </div>

      {/* Checkbox Supervisora/Líder */}
      <div className='flex items-center mt-4'>
        <input
          type='checkbox'
          id='supervisor-checkbox'
          checked={isSupervisor}
          onChange={handleSupervisorChange}
          className='mr-2 w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-400'
        />
        <label htmlFor='supervisor-checkbox' className='text-gray-300'>
          Supervisor/Líder
        </label>
      </div>

      {/* Upload de Arquivo */}
      <div className='w-full mt-4'>
        <label className='block text-gray-400 mb-2'>Anexar Documentos</label>
        <input
          type='file'
          onChange={handleFileUpload}
          className='w-full text-gray-300'
        />
        {uploadedFile && (
          <p className='text-sm text-green-400 mt-2'>Arquivo anexado: {uploadedFile.name}</p>
        )}
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
          className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
