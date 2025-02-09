"use client";

import { useEffect, useState } from "react";
import type { AddressType, AddressProps } from "@/app/types/address";
import { addressSchema } from "@/app/schemas/addressSchema";
import { AddressService } from "@/app/services/addressService";
import employeeData from "@/app/components/data/employeeData.json"; // 🔥 Importando JSON inicial

export function Address({
  data = employeeData.address, // 🔥 Carrega dados do JSON se não houver dados
  onChange,
  isEditable,
  onNext,
  onPrev,
  employeeId, // ID do funcionário para vincular endereço
}: AddressProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errors, setErrors] = useState<{ [key in keyof AddressType]?: string }>({});

  // **Validação dos campos**
  useEffect(() => {
    try {
      addressSchema.parse(data);
      setErrors({});
      setIsNextEnabled(true);
    } catch (error: any) {
      const validationErrors: { [key in keyof AddressType]?: string } = {};
      if (error.errors) {
        error.errors.forEach((e: any) => {
          validationErrors[e.path[0] as keyof AddressType] = e.message;
        });
      }
      setErrors(validationErrors);
      setIsNextEnabled(false);
    }
  }, [data]);

  const handleInputChange = (field: keyof AddressType, value: string) => {
    onChange({ ...data, [field]: value });
  };

  // **Criar um novo endereço (POST)**
  const createAddress = async () => {
    try {
      await AddressService.createAddress({ ...data, employee: employeeId });
      alert("Endereço criado com sucesso!");
      onNext();
    } catch (error) {
      alert("Erro ao criar endereço.");
    }
  };

  useEffect(() => {
    if (employeeId) {
      AddressService.getAddressById(employeeId)
        .then((addressData) => onChange(addressData))
        .catch((error) => console.error("Erro ao buscar endereço:", error));
    }
  }, [employeeId]);

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Endereço</h2>

      {/* Logradouro */}
      <div className="w-full">
        <input
          type="text"
          value={data.street || ""}
          onChange={(e) => handleInputChange("street", e.target.value)}
          placeholder="Digite o logradouro"
          className={`w-full bg-gray-700 text-white border ${errors.street ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
      </div>

      {/* Número */}
      <div className="w-full">
        <input
          type="text"
          value={data.number || ""}
          onChange={(e) => handleInputChange("number", e.target.value)}
          placeholder="Digite o número"
          className={`w-full bg-gray-700 text-white border ${errors.number ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
      </div>

      {/* Bairro */}
      <div className="w-full">
        <input
          type="text"
          value={data.neighborhood || ""}
          onChange={(e) => handleInputChange("neighborhood", e.target.value)}
          placeholder="Digite o bairro"
          className={`w-full bg-gray-700 text-white border ${errors.neighborhood ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
      </div>

      {/* Estado */}
      <div className="w-full">
        <select
          value={data.state || ""}
          onChange={(e) => handleInputChange("state", e.target.value)}
          className={`w-full bg-gray-700 text-white border ${errors.state ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
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
        <button onClick={createAddress} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" disabled={!isNextEnabled}>
          Próximo
        </button>
      </div>
    </div>
  );
}
