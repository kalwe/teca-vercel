'use client'

import { ContactService } from "@/app/services/contactService"
import type { BankAccount, BankProps } from "@/app/types/BankAccount"
import { useState } from 'react'

export function Bank({ data, onChange, onNext, onPrev, employeeId }: BankProps) {
  const [bankData, setBankData] = useState<BankAccount>(data);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof BankAccount, value: any) => {
    const updatedBankData = { ...bankData, [field]: value };
    setBankData(updatedBankData);
    onChange(updatedBankData);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      console.log("Enviando para API:", contactData);
      await ContactService.createContact({ ...contact,  employeeId: Number(employeeId)  });
      alert("Contato criado com sucesso!");
      onNext();
    } catch (error) {
      console.error("Erro ao criar contato:", error);
      alert("Erro ao criar contato. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  const valueFromField = (field: keyof BankAccount, obj: BankAccount) => obj[field] ?? '';

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
            value={String(valueFromField(field.name as keyof BankAccount, bankData))}
            onChange={(e) => handleInputChange(field.name as keyof BankAccount, e.target.value)}
            placeholder={field.placeholder}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"

          />
        </div>
      ))}

      {/* Tipo de Conta */}
      <div className="w-full">
        <select
          name="account_type"
          value={bankData.account_type || ''}
          onChange={(e) => handleInputChange('account_type', e.target.value)}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"

        >
          <option value="">Selecione o tipo de conta</option>
          <option value="corrente">Conta Corrente</option>
          <option value="poupança">Conta Poupança</option>
          <option value="salário">Conta Salário</option>
        </select>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Próximo"}
          </button>

      </div>
    </div>
  )
}
