'use client'

import { ContactService } from '@/app/services/contactService'
import type { Contact, ContactProps } from '@/app/types/contact'
import { useState } from 'react'

export function Contact({ contactData = {}, onChange, onNext, onPrev, employeeId }: ContactProps) {
  const [contact, setContact] = useState<Contact>(contactData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof Contact, value: any) => {
    const contactInput = { ...contact, [field]: value }
    setContact(contactInput);
    onChange(contactInput);
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

  const valueFromField = (field: string, obj: Record<string, any>) => {
    return obj[field] ?? '';
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Contato</h2>

      {[
        { name: 'phone', placeholder: 'Digite o número de telefone', label: 'Telefone' },
        { name: 'email', placeholder: 'Digite o e-mail', label: 'E-mail' },
        { name: 'webSite', placeholder: 'Digite o website', label: 'Website' },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <input
            type="text"
            name={field.name}
            value={String(valueFromField(field.name, contact))}
            onChange={(e) => handleInputChange(field.name as keyof Contact, e.target.value)}
            placeholder={field.placeholder}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          />
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
          disabled={loading}
        >
          {loading ? "Salvando..." : "Próximo"}
        </button>
      </div>
    </div>
  )
}
