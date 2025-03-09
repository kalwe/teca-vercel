"use client";

import MoneyInput from "@/app/components/masks/salary"
import { vacancySchema } from "@/app/schemas/vacancySchema"
import { VacancyService } from "@/app/services/vacancyService"
import { Vacancy } from "@/app/types/vacancyType"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { z } from "zod"
import DropdownCheckboxPosition from "../DropDown/dropdown-position"

export default function VacancyForm() {
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = !!id;
  const vacancyId = isEditMode ? Number(id) : null;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Vacancy>();

  const handleChange = <K extends keyof Vacancy>(field: K, value: Vacancy[K]) => {
    const updatedData = { ...formData, [field]: value };

    try {
      vacancySchema.parse(updatedData);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path.length > 0) {
            fieldErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
    }

    setFormData(updatedData);
  };

  /**
   * Salvar ou Atualizar Vaga
   */
  const handleSave = async () => {
    if (loading) return;
    console.log(id, isEditMode, loading, vacancyId)
    try {
      setLoading(true);
      if (isEditMode && vacancyId) {
       // const validatedData = vacancySchema.parse(formData);
        const {_id, ...vacancyUpdate} = formData;
        console.log(vacancyUpdate)
        await VacancyService.updateVacancy(vacancyId, {...vacancyUpdate});
        alert("Vaga atualizada com sucesso!");
      } else {
       // const validatedData = vacancySchema.parse(formData);
        await VacancyService.createVacancy({...formData});
        alert("Vaga criada com sucesso!");
      }
      router.push("/vacancy-display");
    } catch (error) {
      console.error("Erro ao salvar vaga:", error);
      alert("Erro ao salvar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-white">
          {isEditMode ? "Atualizar Vaga" : "Nova Vaga"}
        </h1>

        {/* Posição */}
        <div>
            {/* Dropdown de Posição */}
            <DropdownCheckboxPosition
            id={formData?.positionId ?? null}
            onChange={(value) => handleChange('positionId', value)}
          />
          {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
        </div>

        {/* Quantidade */}
        <div>
          <input
            type="number"
            placeholder="Quantidade"
            value={formData?.quantity?.toString()}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        {/* Descrição */}
        <div>
        <input
  type="text"
  placeholder="Descrição"
  value={formData?.description ?? ""}
  onChange={(e) => handleChange("description", e.target.value)}
  className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
/>

          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Benefícios */}
        <div>
          <input
            type="text"
            placeholder="Benefícios"
            value={formData?.benefits ?? ""}
            onChange={(e) => handleChange("benefits", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits}</p>}
        </div>

        {/* Requisitos */}
        <div>
          <input
            type="text"
            placeholder="Requisitos"
            value={formData?.requirements ?? ""}
            onChange={(e) => handleChange("requirements", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
        </div>

        {/* Salário */}
        <div>
        <MoneyInput
  value={formData?.salary ? String(formData?.salary) : "0"}
  onChange={(value) => {
    const numericValue = Number(value.replace(/\D/g, "")) / 100;
    handleChange("salary", numericValue);
  }}
/>

          {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
        </div>

        {/* Botão de ação */}
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Salvando..." : isEditMode ? "Atualizar Vaga" : "Salvar Nova Vaga"}
        </button>
      </div>
    </div>
  );
};
