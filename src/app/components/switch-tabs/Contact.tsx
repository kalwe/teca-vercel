"use client";

import { useState } from "react";
import type { ContactProps, ContactType } from "@/app/types/contact";
import { contactSchema } from "@/app/schemas/contactSchema";
import { ContactService } from "@/app/services/contactService";
import { z } from "zod";

export function Contact({
  data = {},
  onChange,
  isEditable,
  onNext,
  onPrev,
}: ContactProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactType, string>>>({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Validação instantânea ao modificar os campos
  const handleInputChange = (field: keyof ContactType, value: string) => {
    const updatedData = { ...data, [field]: value };

    try {
      contactSchema.parse(updatedData); // Valida os dados
      setErrors({}); // Limpa os erros ao preencher corretamente
      setIsNextEnabled(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactType, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof ContactType] = e.message;
        });
        setErrors(newErrors);
        setIsNextEnabled(false);
      }
    }

    onChange(updatedData);
  };

  // Salva os dados de contato
  const createContact = async () => {
    try {
      contactSchema.parse(data); // Valida antes de salvar

      await ContactService.createContact(data);
      alert("Contato cadastrado com sucesso!");
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactType, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof ContactType] = e.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Erro ao criar contato:", error);
        alert("Erro ao criar contato.");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-full">
      <h2 className="text-white text-xl font-bold">Contato</h2>

      {[
        { name: "phone_number", label: "Telefone", placeholder: "Digite o número de telefone" },
        { name: "email", label: "E-mail", placeholder: "Digite o e-mail" },
        { name: "website", label: "Website", placeholder: "Digite o website" },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <label className="block text-gray-400 mb-2">{field.label}</label>
          <input
            type="text"
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleInputChange(field.name as keyof ContactType, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full bg-gray-700 text-white border ${
              errors[field.name] ? "border-red-500" : "border-gray-600"
            } rounded-lg py-2 px-3`}
            disabled={!isEditable}
          />
          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>
        <button
          onClick={createContact}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={!isNextEnabled}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
