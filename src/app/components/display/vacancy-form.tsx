'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

import MoneyInput from '@/app/components/masks/salary'
import { vacancySchema } from '@/app/schemas/vacancySchema'
import { VacancyService } from '@/app/services/vacancyService'
import { Vacancy } from '@/app/types/vacancyType'
import { z } from 'zod'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

const VacancyForm: React.FC = (vacancyData: Vacancy) => {
  const router = useRouter()
  const params = useParams()
  const isEditMode = !!params?.id
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [vacancy, setVacancy] = useState<Vacancy>(vacancyData)

  const fetchVacancy = async (vacancyId: number) => {
    if (isEditMode) {
      try {
        setLoading(true)
        const vacancy = await VacancyService.getVacancyById(vacancyId)
        setVacancy(vacancy)
      } catch (error) {
        console.error('Erro ao buscar vaga:', error)
        alert('Erro ao carregar dados da vaga. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }
  }

  fetchVacancy(Number(params.id))

  const handleChange = <K extends keyof Vacancy>(field: K, value: Vacancy[K]) => {
    const updatedData = { ...vacancy, [field]: value }

    if (updatedData.salary) {
      updatedData.salary = Number(vacancy.salary?.toString().replace(/\D/g, '')) / 100
    }

    try {
      vacancySchema.parse(updatedData)
      setErrors({})
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach((e) => {
          if (e.path.length > 0) {
            fieldErrors[e.path[0] as string] = e.message
          }
        })
        setErrors(fieldErrors)
      }
      4
    }
    setVacancy(updatedData)
  }

  /**
   * Salvar ou Atualizar Vaga
   */
  const handleSave = async () => {
    if (loading) return

    try {
      setLoading(true)
      if (isEditMode) {
        await VacancyService.updateVacancy(vacancy.id!, vacancy)
        alert('Vaga atualizada com sucesso!')
      } else {
        await VacancyService.createVacancy(vacancy)
        alert('Vaga criada com sucesso!')
      }

      router.push('/vagas-display')
    } catch (error) {
      console.error('Erro ao salvar vaga:', error)

      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((e) => {
          fieldErrors[e.path[0] as string] = e.message
        })
        setErrors(fieldErrors)
      } else {
        alert('Erro ao salvar vaga. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-white">
          {isEditMode ? 'Atualizar Vaga' : 'Nova Vaga'}
        </h1>

        <div>
          <DropdownCheckboxPosition
            id={vacancy.positionId ?? null}
            onChange={(value) => handleChange('positionId', value)}
          />
          {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Quantidade"
            value={vacancy.quantity?.toString()}
            onChange={(e) => handleChange('quantity', Number(e.target.value))}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Descrição"
            value={vacancy.description?.toString()}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Benefícios"
            value={vacancy.benefits?.toString()}
            onChange={(e) => handleChange('benefits', e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Requisitos"
            value={vacancy.requirements?.toString()}
            onChange={(e) => handleChange('requirements', e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.requirements && (
            <p className="text-red-500 text-sm">{errors.requirements}</p>
          )}
        </div>
        <div>
          <MoneyInput
            value={String(vacancy.salary)}
            onChange={(value) => {
              const numericValue = Number(value.replace(/\D/g, '')) / 100
              handleChange('salary', numericValue)
            }}
          />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
        </div>

        {/* <div>
          <DatePicker
            selected={
              vacancy.date ? new Date(vacancy.date) : null
            }
            onChange={(date) =>
              handleChange(
                "date",
                date ? date.toISOString().split("T")[0] : ""
              )
            }
            className="p-2 rounded bg-gray-700 text-white"
            placeholderText="Selecione uma data"
            dateFormat="dd/MM/yyyy"
            showTimeSelect={false}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date}</p>
          )}
        </div> */}

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Salvando...' : isEditMode ? 'Atualizar Vaga' : 'Salvar Nova Vaga'}
        </button>
      </div>
    </div>
  )
}

export default VacancyForm
