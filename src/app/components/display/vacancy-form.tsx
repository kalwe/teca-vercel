'use client'

import MoneyInput from '@/app/components/masks/salary'
import { VacancyService } from '@/app/services/vacancyService'
import { Vacancy } from '@/app/types/vacancy'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export default function VacancyForm({ vacancyData }: { vacancyData: Vacancy }) {
  const router = useRouter()
  const { id } = useParams()
  const isEditMode = !!id
  const vacancyId = isEditMode ? Number(id) : null
  const [loading, setLoading] = useState(false)
  const [vacancy, setVacancy] = useState<Vacancy>({})

  useEffect(() => {
    if (isEditMode && vacancyId) {
      setVacancy(vacancyData)
    }
  }, [isEditMode, vacancyData, vacancyId])

  const handleChange = (field: keyof Vacancy, value: any) => {
    setVacancy({ ...vacancy, [field]: value })
  }

  const handleSave = async () => {
    setLoading(true)
    if (isEditMode && vacancyId) {
      const { id, ...vacancyInputUpdate } = vacancy
      await VacancyService.updateVacancy(Number(id), vacancyInputUpdate)
      alert('Vaga atualizada com sucesso!')
    } else {
      await VacancyService.createVacancy(vacancy)
      alert('Vaga criada com sucesso!')
    }
    setLoading(false)
    router.push('/vacancy-display')
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600'>
      <div className='w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border flex flex-col gap-6'>
        <h1 className='text-4xl font-extrabold text-white'>
          {isEditMode ? 'Atualizar Vaga' : 'Nova Vaga'}
        </h1>
        <div>
          <DropdownCheckboxPosition
            id={vacancy?.positionId ?? 1}
            onChange={(id) => handleChange('positionId', id)}
          />
        </div>

        <div>
          <input
            type='number'
            placeholder='Quantidade'
            value={vacancy?.quantity || ''}
            onChange={(e) => handleChange('quantity', Number(e.target.value))}
            className='w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300'
          />
        </div>

        <div>
          <input
            type='text'
            placeholder='Descrição'
            value={vacancy?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className='w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300'
          />
        </div>

        <div>
          <input
            type='text'
            placeholder='Benefícios'
            value={vacancy?.benefits || ''}
            onChange={(e) => handleChange('benefits', e.target.value)}
            className='w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300'
          />
        </div>

        <div>
          <input
            type='text'
            placeholder='Requisitos'
            value={vacancy?.requirements || ''}
            onChange={(e) => handleChange('requirements', e.target.value)}
            className='w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300'
          />
        </div>

        <div>
          <MoneyInput
            value={vacancy?.salary ? String(vacancy?.salary) : '0'}
            onChange={(value) => {
              const numericValue = Number(value.replace(/\D/g, '')) / 100
              handleChange('salary', numericValue)
            }}
          />
        </div>

        <button
          onClick={handleSave}
          className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? 'Salvando...' : isEditMode ? 'Atualizar Vaga' : 'Salvar Nova Vaga'}
        </button>
      </div>
    </div>
  )
}
