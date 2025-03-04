'use client'

import { AddressService } from '@/app/services/addressService'
import type { AddressProps } from '@/app/types/address'

export function Address({
  data = {},
  onChange,
  isEditable,
  onNext,
  onPrev,
  employee,
}: AddressProps) {
  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...data, [field]: value }
    onChange(updatedData)
  }

  const handleSave = async () => {
    try {
      const formattedData = {
        ...data,
        employee,
        street: data.street || 'Rua Padrão',
        number: data.number || '0',
        neighborhood: data.neighborhood || 'Bairro Padrão',
        city: data.city || 'Cidade Padrão',
        zip_code: data.zip_code || '00000-000', // TODO: zip_code nao existe
        state: data.state || 'SP', // Estado padrão
      }

      console.log('🚀 Enviando endereço:', JSON.stringify(formattedData, null, 2))

      await AddressService.createAddress(formattedData)
      console.log('✅ Endereço cadastrado com sucesso!')
      onNext()
    } catch (error) {
      alert('❌ Erro ao cadastrar endereço.')
      console.error('Erro ao enviar para API:', error)
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Endereço</h2>

      {[
        { name: 'street', placeholder: 'Digite o logradouro' },
        { name: 'number', placeholder: 'Digite o número' },
        { name: 'neighborhood', placeholder: 'Digite o bairro' },
        { name: 'city', placeholder: 'Digite a cidade' },
        { name: 'zip_code', placeholder: 'Digite o CEP' },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <input
            type="text"
            name={field.name}
            value={data[field.name] || ''}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
            disabled={!isEditable}
          />
        </div>
      ))}

      {/* Estado (Dropdown) */}
      <div className="w-full">
        <select
          name="state"
          value={data.state || ''}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        >
          <option value="">Selecione o estado</option>
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
            'TO',
          ].map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>

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
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
