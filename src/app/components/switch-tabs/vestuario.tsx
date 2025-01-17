"use client";

import { useEffect, useState } from "react";
import { VestuarioProps } from "@/app/types/employee";

export function Vestuario({ data, onChange, mode }: VestuarioProps) {
  const [erro, setErro] = useState({ calca: "", calcado: "" });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Validation
  useEffect(() => {
    const isValid =
      (data.tamanhoCamisa?.trim() || "") !== "" &&
      (data.tamanhoCalca?.trim() || "") !== "" &&
      (data.tamanhoCalcado?.trim() || "") !== "" &&
      erro.calca === "" &&
      erro.calcado === "";

    setIsSaveEnabled(isValid);
  }, [data, erro]);

  const handleInputChange = (field: keyof typeof data, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleCalcaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setErro((prev) => ({ ...prev, calca: "" }));
      handleInputChange("tamanhoCalca", value);
    } else {
      setErro((prev) => ({
        ...prev,
        calca: "Apenas números são permitidos.",
      }));
    }
  };

  const handleCalcadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setErro((prev) => ({ ...prev, calcado: "" }));
      handleInputChange("tamanhoCalcado", value);
    } else {
      setErro((prev) => ({
        ...prev,
        calcado: "Apenas números são permitidos.",
      }));
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-[100%]">
      {/* Tamanho Camisa */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho Camisa</label>
        <input
          type="text"
          value={data.tamanhoCamisa || ""}
          onChange={(e) => handleInputChange("tamanhoCamisa", e.target.value)}
          placeholder="Digite o tamanho da camisa"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={mode === "view"}
        />
      </div>

      {/* Tamanho Calça */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho Calça</label>
        <input
          type="text"
          value={data.tamanhoCalca || ""}
          onChange={handleCalcaChange}
          placeholder="Digite o tamanho da calça (somente números)"
          className={`w-full bg-gray-700 text-white placeholder-gray-400 border ${
            erro.calca ? "border-red-600" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 ${
            erro.calca ? "focus:ring-red-500" : "focus:ring-green-500"
          }`}
          disabled={mode === "view"}
        />
        {erro.calca && <p className="text-red-500 text-sm mt-1">{erro.calca}</p>}
      </div>

      {/* Tamanho Calçado */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho Calçado</label>
        <input
          type="text"
          value={data.tamanhoCalcado || ""}
          onChange={handleCalcadoChange}
          placeholder="Digite o tamanho do calçado (somente números)"
          className={`w-full bg-gray-700 text-white placeholder-gray-400 border ${
            erro.calcado ? "border-red-600" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 ${
            erro.calcado ? "focus:ring-red-500" : "focus:ring-green-500"
          }`}
          disabled={mode === "view"}
        />
        {erro.calcado && (
          <p className="text-red-500 text-sm mt-1">{erro.calcado}</p>
        )}
      </div>

    </div>
  );
}
