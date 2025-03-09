'use client'

import { clothingSchema } from '@/app/schemas/clothingSchema'
import { ClothingService } from '@/app/services/clothingService'
import type { ClothingProps, ClothingType } from '@/app/types/clothing'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

export function Clothing({
  // TODO: ajusta a interface pq ta tudo dando erro de type
  data = {},
  onChange,
  isEditable, // TODO: adiciona pq nao

  onPrev, // TODO: adiciona pq nao
  employee, // TODO: adiciona pq nao
}: ClothingProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ClothingType, string>>>({})
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...data, [field]: value }

    try {
      clothingSchema.parse(updatedData) // Valida os dados
      setErrors({}) // Limpa os erros ao preencher corretamente
      setIsNextEnabled(true)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message
        })
        setErrors(newErrors)
        setIsNextEnabled(false)
      }
    }

    onChange(updatedData)
  }

  const handleSave = async () => {
    try {
      const createdClothing = await ClothingService.createClothing({ ...data, employee })
      console.log(createdClothing)

      router.push('/contract-display/employee')
    } catch (error) {
      alert('Erro ao cadastrar conta bancária. Verifique os campos.')
      console.error(error)
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Vestuário</h2>

      {[
        {
          name: 'shirt_size',
          placeholder: 'Digite o tamanho da camisa',
          label: 'Tamanho da Camisa',
        },
        {
          name: 'pants_size',
          placeholder: 'Digite o tamanho da calça',
          label: 'Tamanho da Calça',
        },
        {
          name: 'shoe_size',
          placeholder: 'Digite o tamanho do calçado',
          label: 'Tamanho do Calçado',
        },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <input
            type="text"
            name={field.name}
            value={data[field.name] || ''}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full bg-gray-700 text-white border ${
              errors[field.name] ? 'border-red-500' : 'border-gray-600'
            } rounded-lg py-2 px-3`}
            disabled={!isEditable}
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}

      {/* Botões */}
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
          disabled={!isNextEnabled}
        >
          Salvar
        </button>
      </div>
    </div>
  )
}
