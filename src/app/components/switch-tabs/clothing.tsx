"use client";

import { useState } from "react";
import { clothingSchema } from "@/app/schemas/clothingSchema";
import { ClothingProps } from "@/app/types/clothing";
import { ClothingService } from "@/app/services/clothingService";
import { z } from "zod";

export function Clothing({ data = {}, onChange, mode, employeeId }: ClothingProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ClothingProps["data"], string>>>({});
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Validação instantânea ao digitar
  const handleInputChange = (field: keyof ClothingProps["data"], value: string) => {
    const updatedData = { ...data, [field]: value };

    try {
      clothingSchema.parse(updatedData); // Valida os dados
      setErrors({}); // Limpa os erros ao preencher corretamente
      setIsSaveEnabled(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ClothingProps["data"], string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof ClothingProps["data"]] = e.message;
        });
        setErrors(newErrors);
        setIsSaveEnabled(false);
      }
    }

    onChange(updatedData);
  };

  // Salva os dados de vestuário
  const handleSave = async () => {
    try {
      clothingSchema.parse(data); // Valida antes de salvar

      const newClothing = { ...data, employee: employeeId };
      await ClothingService.createClothing(newClothing);

      alert("Vestuário cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ClothingProps["data"], string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof ClothingProps["data"]] = e.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Erro ao salvar vestuário:", error);
        alert("Erro ao salvar vestuário.");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-full">
      <h2 className="text-white text-xl font-bold">Vestuário</h2>

      {[
        { name: "shirt_size", label: "Tamanho da Camisa", placeholder: "Digite o tamanho da camisa" },
        { name: "pants_size", label: "Tamanho da Calça", placeholder: "Digite o tamanho da calça" },
        { name: "shoe_size", label: "Tamanho do Calçado", placeholder: "Digite o tamanho do calçado" },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <label className="block text-gray-400 mb-2">{field.label}</label>
          <input
            type="text"
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleInputChange(field.name as keyof ClothingProps["data"], e.target.value)}
            placeholder={field.placeholder}
            className={`w-full bg-gray-700 text-white border ${
              errors[field.name] ? "border-red-500" : "border-gray-600"
            } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
            disabled={mode === "view"}
          />
          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
        </div>
      ))}

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
