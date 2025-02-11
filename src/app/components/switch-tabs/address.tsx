"use client";

import { useEffect, useState } from "react";
import type { AddressType, AddressProps } from "@/app/types/address";
// import { addressSchema } from "@/app/schemas/addressSchema";
import { AddressService } from "@/app/services/addressService";
import employeeData from "@/app/components/data/employeeData.json";

export function Address({
  // TODO: why use json?
  data = employeeData.address || {}, //  Garante que `data` não seja undefined
  onChange,
  isEditable,
  onNext,
  onPrev,
  employee,
}: AddressProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errors, setErrors] = useState<{ [key in keyof AddressType]?: string }>({});

  // **Validação dos campos**
  useEffect(() => {
    try {
      setErrors({});
      setIsNextEnabled(true);
    } catch (error) {
      console.error("Erro de validação:", error.errors); //  Log para depuração
      const validationErrors: { [key in keyof AddressType]?: string } = {};
      if (error.errors) {
        error.errors.forEach((e) => {
          validationErrors[e.path[0] as keyof AddressType] = e.message;
        });
      }
      setErrors(validationErrors);
      setIsNextEnabled(false);
    }
  }, [data]);

  const handleInputChange = (e) => {
    console.log(e)
    const { name, value } = e.target
    onChange({ ...data, [name]: value });
  };

  // **Criar um novo endereço (POST)**
  const handleSave = async () => {
    try {
      const createdAddress = await AddressService.createAddress({ ...data, employee: employee });
      console.log(createdAddress)
      onNext();
    } catch (error) {
      alert("Erro ao criar endereço.", error);
    }
  };

  useEffect(() => {
    if (employee && Object.values(data).every((val) => !val)) {
      //  Apenas sobrescreve se os campos estiverem vazios
      // TODO: what hell getAddressById where
      AddressService.getAddressById(employeed)
        // TODO: wada FUCK use then?!??!
        .then((addressData) => onChange(addressData))
        .catch((error) => console.error("Erro ao buscar endereço:", error));
      }
  }, [employee]);

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Endereço</h2>
      {/* Logradouro */}
      <div className="w-full">
        <input
          type="text"
          value={data.street || ""}
          name="street"
          onChange={(e) => handleInputChange(e)}
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
          name="number"
          onChange={(e) => handleInputChange(e)}
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
          name="neighborhood"
          onChange={(e) => handleInputChange(e)}
          placeholder="Digite o bairro"
          className={`w-full bg-gray-700 text-white border ${errors.neighborhood ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
      </div>
      {/* Cidade */}
      <div className="w-full">
        <input
          type="text"
          value={data.city || ""}
          name="city"
          onChange={(e) => handleInputChange(e)}
          placeholder="Digite a cidade"
          className={`w-full bg-gray-700 text-white border ${errors.city ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
      </div>
      {/* CEP */}
      <div className="w-full">
        <input
          type="text"
          value={data.zip_code || ""}
          name="zip_code"
          onChange={(e) => handleInputChange(e)}
          placeholder="Digite o CEP"
          className={`w-full bg-gray-700 text-white border ${errors.zip_code ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code}</p>}
      </div>
      {/* Estado */}
      <div className="w-full">
        <select
          value={data.state || ""}
          name="state"
          onChange={(e) => handleInputChange(e)}
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
        <button onClick={handleSave} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" disabled={!isNextEnabled}>
          Próximo
        </button>
      </div>
    </div>
  );
}
