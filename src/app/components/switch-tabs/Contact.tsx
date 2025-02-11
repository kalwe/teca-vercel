"use client";

import { useEffect, useState } from "react";
import type { ContactProps, ContactType } from "@/app/types/contact";
import { contactSchema } from "@/app/schemas/contactSchema";
import { ContactService } from "@/app/services/contactService";
import contactData from "@/app/components/data/employeeData.json";

export function Contact({
  data = {},
  onChange,
  isEditable,
  onNext,
  onPrev,
}: ContactProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactType, string | null>>>({
    phone_number: null,
    email: null,
    website: null,
  });

  useEffect(() => {
    try {
      contactSchema.parse(data);
      setErrors({});
      setIsNextEnabled(true);
    } catch (err: any) {
      console.error("Erro de validação:", err.errors);
      const newErrors: Partial<Record<keyof ContactType, string | null>> = {};
      err.errors?.forEach((e: any) => {
        const field = e.path[0] as keyof ContactType;
        newErrors[field] = e.message;
      });
      setErrors(newErrors);
      setIsNextEnabled(false);
    }
  }, [data]);

  const handleInputChange = (field: keyof ContactType, value: string) => {
    const updatedData = { ...data, [field]: value };
    onChange(updatedData);
  };

  const createContact = async () => {
    try {
      await ContactService.createContact(data);
      alert("Contato criado com sucesso!");
      onNext();
    } catch (error) {
      console.error("Erro ao criar contato:", error);
      alert("Erro ao criar contato.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-[100%]">
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Telefone</label>
        <input
          type="text"
          value={data?.phone_number || ""}
          onChange={(e) => handleInputChange("phone_number", e.target.value)}
          placeholder="Digite o número de telefone"
          className={`w-full bg-gray-700 text-white border ${
            errors.phone_number ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.phone_number && (
          <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
        )}
      </div>

      <div className="w-full">
        <label className="block text-gray-400 mb-2">E-mail</label>
        <input
          type="text"
          value={data?.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Digite o e-mail"
          className={`w-full bg-gray-700 text-white border ${
            errors.email ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="w-full">
        <label className="block text-gray-400 mb-2">Website</label>
        <input
          type="text"
          value={data?.website || ""}
          onChange={(e) => handleInputChange("website", e.target.value)}
          placeholder="Digite o website"
          className={`w-full bg-gray-700 text-white border ${
            errors.website ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
      </div>

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
