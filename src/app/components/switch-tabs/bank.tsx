'use client'

import { BankService } from '@/app/services/bankService'
import { SwitchTabsComponentsProps } from '@/app/types/base'
import { useEffect, useState } from 'react'

export function Bank({ data, onNext, onPrev, employeeId }: SwitchTabsComponentsProps) {
  const [bankData, setBankData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBank = async () => {
      setBankData(data)
      setLoading(false)
    }
    if (data) {
      setLoading(true)
      fetchBank()
    }
  }, [data])

  const handleInputChange = (field: any, value: any) => {
    setBankData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      if (employeeId) {
        const { id, ...bankUpdate } = bankData
        await BankService.updateBankAccount(id, {
          ...bankUpdate,
          employeeId: Number(employeeId)
        })
      } else {
        const employeeId = localStorage.getItem('employeeId')
        await BankService.createBankAccount({
          ...bankData,
          employeeId: Number(employeeId)
        })
      }
      alert('Banco salvo com sucesso!')
      onNext()
    } catch (error) {
      console.error('Erro ao salvar banco:', error)
      alert('Erro ao salvar banco. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Dados Bancários</h2>

      {[
        { name: 'name', placeholder: 'Digite o nome do banco', label: 'Banco' },
        { name: 'agency', placeholder: 'Digite a agência', label: 'Agência' },
        { name: 'account', placeholder: 'Digite a conta', label: 'Conta' }
      ].map((field) => (
        <div key={field.name} className='w-full'>
          <input
            type='text'
            name={field.name}
            value={bankData?.[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          />
        </div>
      ))}

      {/* Tipo de Conta */}
      <div className='w-full'>
        <select
          name='type'
          value={bankData?.['type'] || ''}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
        >
          <option value=''>Selecione o tipo de conta</option>
          <option value='CORRENTE'>Conta Corrente</option>
          <option value='POUPANCA'>Conta Poupança</option>
          <option value='SALARIO'>Conta Salário</option>
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
