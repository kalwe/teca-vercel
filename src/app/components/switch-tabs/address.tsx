"use client"

import { useState} from "react"
import type { AddressType, AddressProps } from "@/app/types/address"
import { AddressService } from "@/app/services/addressService"
import { addressSchema } from "@/app/schemas/addressSchema"
import { z } from "zod"

export function Address({
  data = {},
  onChange,
  isEditable,
  onNext,
  onPrev,
  employee,
}: AddressProps) {

  const [isNextEnabled, setIsNextEnabled] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof AddressType, string>>>({})

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...data, [field]: value };

    try {
      addressSchema.parse(updatedData); // Valida os dados
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
      const createdAddress = await AddressService.createAddress({ ...data, employee })
      console.log(createdAddress)
      onNext()
    } catch (error) {
      alert("Erro ao criar endereço. Verifique os campos.")
      console.error(error)
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Endereço</h2>

      {[
        { name: "street", placeholder: "Digite o logradouro", label: "Logradouro" },
        { name: "number", placeholder: "Digite o número", label: "Número" },
        { name: "neighborhood", placeholder: "Digite o bairro", label: "Bairro" },
        { name: "city", placeholder: "Digite a cidade", label: "Cidade" },
        { name: "zip_code", placeholder: "Digite o CEP", label: "CEP" },
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

      {/* Estado (Dropdown) */}
      <div className="w-full">
        <select
          name="state"
          value={data.state || ""}
          onChange={(e) => handleInputChange("state", e.target.value)}
          className={`w-full bg-gray-700 text-white border ${
            errors.state ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        >
          <option value="">Selecione o estado</option>
          {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
            "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
            "RR", "SC", "SP", "SE", "TO"].map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
      </div>

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
