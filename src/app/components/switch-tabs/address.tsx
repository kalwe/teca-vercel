'use client'

import { AddressService } from '@/app/services/addressService'
import { useState } from 'react'

export function Address({ data = {}, onNext, onPrev, employeeId }: any) {
  const [addressData, setAddressData] = useState<any>(data || {})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: any, value: any) => {
    const updatedAddress = { ...addressData, [field]: value }
    setAddressData(updatedAddress)
    // onChange(updatedAddress)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      employeeId = localStorage.getItem('employeeId')
      await AddressService.createAddress({
        ...addressData,
        employeeId: Number(employeeId)
      })
      alert('Endereço cadastrado com sucesso!')
      onNext()
    } catch (error) {
      console.error('Erro ao cadastrar endereço:', error)
      alert('Erro ao cadastrar endereço. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Endereço</h2>

      {[
        { name: 'street', placeholder: 'Digite o logradouro', label: 'Logradouro' },
        { name: 'number', placeholder: 'Digite o número', label: 'Número' },
        { name: 'neighborhood', placeholder: 'Digite o bairro', label: 'Bairro' },
        { name: 'city', placeholder: 'Digite a cidade', label: 'Cidade' },
        { name: 'postCode', placeholder: 'Digite o CEP', label: 'CEP' }
      ].map((field) => (
        <div key={field.name} className='w-full'>
          <input
            type='text'
            name={field.name}
            value={addressData?.[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          />
        </div>
      ))}

      {/* Estado (Dropdown) */}
      <div className='w-full'>
        <select
          name='state'
          value={addressData?.state || ''}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
        >
          <option value=''>Selecione o estado</option>
          {[
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO'
          ].map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
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
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </button>
      </div>
    </div>
  )
}
