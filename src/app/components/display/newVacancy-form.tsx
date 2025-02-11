"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useVagasContext } from "@/app/context/VagasContext";
import { vacancySchema, Vacancy, VacancyService } from "@/app/schemas/vacancySchema";
import { z } from "zod";
import MoneyInput from "@/app/components/masks/salary"; // Importação do MoneyInput
import DropdownCheckboxPosition from "../DropDown/dropdown-position";

interface VagasFormProps {
  vacancyData?: Vacancy;
  setVacancyData: React.Dispatch<React.SetStateAction<Vacancy>>;
}

const NovaVagaForm: React.FC<VagasFormProps> = ({ vacancyData, setVacancyData }) => {
  const { vacancies, setVacancies } = useVagasContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialVacancyData: Vacancy = vacancyData || {
    position: "",
    quantity: 1,
    description: "",
    requirements: "",
    benefits: "",
    salary: 0,
    date: "",
  };

  const [localVacancyData, setLocalVacancyData] = useState<Vacancy>(initialVacancyData);

  /**
   * Atualiza os valores do formulário e faz validação em tempo real.
   */
  const handleChange = <K extends keyof Vacancy>(field: K, value: Vacancy[K]) => {
    const updatedData = { ...localVacancyData, [field]: value };

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

    setLocalVacancyData(updatedData);
    setVacancyData(updatedData);
  };

  /**
   * 🚀 Salvar nova vaga (POST)
   */
  const handleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const validatedData = vacancySchema.parse(localVacancyData);
      const newVacancy = await VacancyService.createVacancy(validatedData);

      console.log("Vaga criada com sucesso!", newVacancy);
      setVacancies([...vacancies, newVacancy]);

      router.push("/vagas-display/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((e) => {
          fieldErrors[e.path[0] as string] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error(" Erro ao criar vaga:", error);
        alert("Erro ao criar vaga. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-white">Nova Vaga</h1>

        {/* Campos do Formulário */}
        <div>
         <DropdownCheckboxPosition/>
          {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Quantidade"
            value={localVacancyData.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Descrição"
            value={localVacancyData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Requisitos"
            value={localVacancyData.requirements}
            onChange={(e) => handleChange("requirements", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Benefícios"
            value={localVacancyData.benefits}
            onChange={(e) => handleChange("benefits", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits}</p>}
        </div>

        {/* Salary com MoneyInput */}
        <div>
          <MoneyInput
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(localVacancyData.salary)}
            onChange={(value) => {
              const numericValue = Number(value.replace(/[^\d,]/g, "").replace(",", "."));
              handleChange("salary", numericValue);
            }}
          />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
        </div>

        {/* Seletor de Data e Hora */}
        <div>
          <DatePicker
            selected={localVacancyData.date ? new Date(localVacancyData.date) : null}
            onChange={(date) => handleChange("date", date ? date.toISOString() : "")}
            className="p-2 rounded bg-gray-700 text-white"
            placeholderText="Selecione uma data"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy HH:mm"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Nova Vaga"}
        </button>
      </div>
    </div>
  );
};

export default NovaVagaForm;
