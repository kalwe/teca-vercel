"use client"

import { useState } from "react"
import type { ContactProps, ContactType } from "@/app/types/contact"
import { ContactService } from "@/app/services/contactService"
import { contactSchema } from "@/app/schemas/contactSchema"
import { z } from "zod"

export function Contact({
  data = {},
  onChange,
  isEditable,
  onNext,
  onPrev,
  employee, // Mantendo mesmo padrão do Address.tsx
}: ContactProps) {

  const [isNextEnabled, setIsNextEnabled] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactType, string>>>({})

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...data, [field]: value };

    try {
      contactSchema.parse(updatedData); // Valida os dados
      setErrors({}); // Limpa os erros ao preencher corretamente
      setIsNextEnabled(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);
        setIsNextEnabled(false);
      }
    }

    onChange(updatedData);
  };

  const handleSave = async () => {
    try {
      const createdContact = await ContactService.createContact({ ...data, employee })
      console.log(createdContact)
      onNext()
    } catch (error) {
      alert("Erro ao criar contato. Verifique os campos.")
      console.error(error)
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Contato</h2>

      {[
        { name: "phone_number", placeholder: "Digite o número de telefone", label: "Telefone" },
        { name: "email", placeholder: "Digite o e-mail", label: "E-mail" },
        { name: "website", placeholder: "Digite o website", label: "Website" },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <input
            type="text"
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full bg-gray-700 text-white border ${
              errors[field.name] ? "border-red-500" : "border-gray-600"
            } rounded-lg py-2 px-3`}
            disabled={!isEditable}
          />
          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={!isNextEnabled}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
