'use client'

import { ClothingService } from '@/app/services/clothingService'
import { SwitchTabsComponentsProps } from '@/app/types/base'
import { useEffect, useState } from 'react'

export function Clothing({
  data,
  onNext,
  onPrev,
  employeeId
}: SwitchTabsComponentsProps) {
  const [clothing, setClothing] = useState<any>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchClothing = async () => {
      setClothing(data)
      setLoading(false)
    }
    if (data) {
      setLoading(true)
      fetchClothing()
    }
  }, [data])

  const handleInputChange = (field: any, value: any) => {
    const updatedClothing = { ...clothing, [field]: value }
    setClothing(updatedClothing)
    // onChange(updatedClothing)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      if (employeeId) {
        const { id, ...clothingUpdate } = clothing
        await ClothingService.updateClothing(id, {
          ...clothingUpdate,
          employeeId: Number(employeeId)
        })
      } else {
        const employeeId = localStorage.getItem('employeeId')
        await ClothingService.createClothing({
          ...clothing,
          employeeId: Number(employeeId)
        })
      }
      alert('Vestuário salvo com sucesso!')
      onNext()
    } catch (error) {
      console.error('Erro ao salvar vestuário:', error)
      alert('Erro ao salvar vestuário. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Vestuário</h2>

      {[
        {
          name: 'shirt',
          placeholder: 'Digite o tamanho da camisa',
          label: 'Tamanho da Camisa'
        },
        {
          name: 'pants',
          placeholder: 'Digite o tamanho da calça',
          label: 'Tamanho da Calça'
        },
        {
          name: 'shoes',
          placeholder: 'Digite o tamanho do calçado',
          label: 'Tamanho do Calçado'
        }
      ].map((field) => (
        <div key={field.name} className='w-full'>
          <input
            type='text'
            name={field.name}
            value={clothing?.[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          />
        </div>
      ))}

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
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  )
}
