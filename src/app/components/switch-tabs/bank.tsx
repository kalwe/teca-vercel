'use client'

import { bankAccountSchema } from '@/app/schemas/bankAccountSchema'
import { BankService } from '@/app/services/bankService'
import type { BankAccountType, BankProps } from '@/app/types/bank_account' // TODO: aquivo nao existe, importa o correto
import { useState } from 'react'
import { z } from 'zod'

export function Bank({
  data = {},
  onChange,
  isEditable,
  onNext,
  onPrev,
  employee, // Mantendo mesmo padrão do Address.tsx
}: BankProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof BankAccountType, string>>>({})

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...data, [field]: value }

    try {
      bankAccountSchema.parse(updatedData) // Valida os dados
      setErrors({}) // Limpa os erros ao preencher corretamente
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message
        })
        setErrors(newErrors)
      }
    }

    onChange(updatedData)
  }

  const handleSave = async () => {
    try {
      console.log('Enviando dados para criação:', { ...data, employee })
      const createdBankAccount = await BankService.createBankAccount({
        ...data,
        employee,
      })
      console.log('Resposta da API:', createdBankAccount)

      onNext()
    } catch (error) {
      alert('Erro ao cadastrar conta bancária. Verifique os campos.')
      console.error(error)
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Dados Bancários</h2>

      {[
        { name: 'bank', placeholder: 'Digite o nome do banco', label: 'Banco' },
        { name: 'agency', placeholder: 'Digite a agência', label: 'Agência' },
        { name: 'account', placeholder: 'Digite a conta', label: 'Conta' },
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

      {/* Tipo de Conta */}
      <div className="w-full">
        <select
          name="account_type"
          value={data.account_type || ''}
          onChange={(e) => handleInputChange('account_type', e.target.value)}
          className={`w-full bg-gray-700 text-white border ${
            errors.account_type ? 'border-red-500' : 'border-gray-600'
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        >
          <option value="">Selecione o tipo de conta</option>
          <option value="corrente">Conta Corrente</option>
          <option value="poupança">Conta Poupança</option>
          <option value="salário">Conta Salário</option>
        </select>
        {errors.account_type && (
          <p className="text-red-500 text-sm mt-1">{errors.account_type}</p>
        )}
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
