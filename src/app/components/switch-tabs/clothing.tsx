"use client";

import { useEffect, useState } from "react";
import { clothingSchema } from "@/app/schemas/clothingSchema";
import { ClothingProps } from "@/app/types/clothing";
import { ClothingService } from "@/app/services/clothingService"; // 🔥 Importa o service

export function Clothing({ data, onChange, mode, employeeId }: ClothingProps) {
  const [errors, setErrors] = useState({
    shirt_size: null,
    pants_size: null,
    shoe_size: null,
  });

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // ✅ Validação e habilitação do botão "Salvar"
  useEffect(() => {
    try {
      clothingSchema.parse(data);
      setErrors({ shirt_size: null, pants_size: null, shoe_size: null });
      setIsSaveEnabled(true);
    } catch (err: any) {
      const newErrors = { shirt_size: null, pants_size: null, shoe_size: null };
      err.errors?.forEach((e: any) => {
        if (e.path.includes("shirt_size")) newErrors.shirt_size = e.message;
        if (e.path.includes("pants_size")) newErrors.pants_size = e.message;
        if (e.path.includes("shoe_size")) newErrors.shoe_size = e.message;
      });
      setErrors(newErrors);
      setIsSaveEnabled(false);
    }
  }, [data]);

  // 🔄 Atualiza os campos no formulário
  const handleInputChange = (field: keyof ClothingProps["data"], value: string) => {
    onChange({ ...data, [field]: value });
  };

  // 🔥 Criar vestuário via API
  const handleSave = async () => {
    try {
      const newClothing = { ...data, employee: employeeId };
      await ClothingService.createClothing(newClothing);
      alert("Vestuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar vestuário:", error);
      alert("Erro ao salvar vestuário.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-[100%]">
      {/* Tamanho da Camisa */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho da Camisa</label>
        <input
          type="text"
          value={data.shirt_size || ""}
          onChange={(e) => handleInputChange("shirt_size", e.target.value)}
          placeholder="Digite o tamanho da camisa"
          className={`w-full bg-gray-700 text-white border ${
            errors.shirt_size ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={mode === "view"}
        />
        {errors.shirt_size && <p className="text-red-500 text-sm mt-1">{errors.shirt_size}</p>}
      </div>

      {/* Tamanho da Calça */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho da Calça</label>
        <input
          type="text"
          value={data.pants_size || ""}
          onChange={(e) => handleInputChange("pants_size", e.target.value)}
          placeholder="Digite o tamanho da calça"
          className={`w-full bg-gray-700 text-white border ${
            errors.pants_size ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={mode === "view"}
        />
        {errors.pants_size && <p className="text-red-500 text-sm mt-1">{errors.pants_size}</p>}
      </div>

      {/* Tamanho do Calçado */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho do Calçado</label>
        <input
          type="text"
          value={data.shoe_size || ""}
          onChange={(e) => handleInputChange("shoe_size", e.target.value)}
          placeholder="Digite o tamanho do calçado"
          className={`w-full bg-gray-700 text-white border ${
            errors.shoe_size ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={mode === "view"}
        />
        {errors.shoe_size && <p className="text-red-500 text-sm mt-1">{errors.shoe_size}</p>}
      </div>

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        disabled={!isSaveEnabled}
      >
        Salvar
      </button>
    </div>
  );
}
