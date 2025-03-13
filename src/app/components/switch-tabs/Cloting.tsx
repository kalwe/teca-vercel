'use client'

import { ClothingService } from '@/app/services/clothingService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Clothing({ data = {}, onChange, onPrev, employeeId }: any) {
  const [clothing, setClothing] = useState<any>(data || {})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: any, value: any) => {
    const updatedClothing = { ...clothing, [field]: value }
    setClothing(updatedClothing)
    // onChange(updatedClothing)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      employeeId = localStorage.getItem('employeeId')
      await ClothingService.createClothing({
        ...clothing,
        employeeId: Number(employeeId)
      })
      alert('Dados de vestuário cadastrados com sucesso!')
      router.push('/contract-display/employee')
    } catch (error) {
      console.error('Erro ao cadastrar vestuário:', error)
      alert('Erro ao cadastrar vestuário. Tente novamente.')
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
          name: 'shoe',
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
