"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter, useParams } from "next/navigation";

import { vacancySchema, Vacancy } from "@/app/schemas/vacancySchema";
import { VacancyService } from "@/app/services/vacancyService";
import { z } from "zod";
import MoneyInput from "@/app/components/masks/salary";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";

interface VacancyFormProps {
  vacancyData?: Vacancy;
  setVacancyData: React.Dispatch<React.SetStateAction<Vacancy>>;
  onSave: any
  isEditMode: any
}

const NewVacancyForm: React.FC<VacancyFormProps> = ({ vacancyData, setVacancyData }) => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = !!params.id; // Verifica se tem ID na URL
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialVacancyData: Vacancy = vacancyData || {
    position: '',
    quantity: 1,
    description: '',
    requirements: '',
    benefits: '',
    salary: 0,
    // date: '',
  };

  const [localVacancyData, setLocalVacancyData] = useState<Vacancy>(initialVacancyData);

  /**
   * Carrega dados da vaga para edição
   */
  useEffect(() => {
    const fetchVacancy = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const vacancy = await VacancyService.getVacancyById(Number(params.id));
          setLocalVacancyData(vacancy);
        } catch (error) {
          console.error("Erro ao buscar vaga:", error);
          alert("Erro ao carregar dados da vaga. Tente novamente.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVacancy();
  }, [isEditMode, params.id]);

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
   * Salvar ou Atualizar Vaga
   */
  const handleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const dataToValidate = {
        ...localVacancyData,
        salary: parseFloat(localVacancyData.salary.toString().replace(/\D/g, "")) / 100
      };

      console.log("Tipo de salary antes de validar:", typeof dataToValidate.salary);
      console.log("Valor de salary antes de validar:", dataToValidate.salary);

      const validatedData = vacancySchema.parse(dataToValidate);

      validatedData.salary = Number(validatedData.salary);

      console.log("Tipo de salary antes de enviar:", typeof validatedData.salary);
      console.log("Valor de salary antes de enviar:", validatedData.salary);

      if (isEditMode) {
        await VacancyService.updateVacancy(validatedData.id!, validatedData);
        alert("Vaga atualizada com sucesso!");
      } else {
        await VacancyService.createVacancy(validatedData);
        alert("Vaga criada com sucesso!");
      }

      router.push("/vagas-display");
    } catch (error) {
      console.error("Erro ao salvar vaga:", error);

      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((e) => {
          fieldErrors[e.path[0] as string] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        alert("Erro ao salvar vaga. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };


// Converte salary para número se estiver em modo de edição
useEffect(() => {
  if (vacancyData && vacancyData.salary) {
    setLocalVacancyData({
      ...vacancyData,
      salary: Number(vacancyData.salary.toString().replace(/\D/g, "")) / 100
    });
  }
}, [vacancyData]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-white">
          {isEditMode ? "Atualizar Vaga" : "Nova Vaga"}
        </h1>

        <div>
          <DropdownCheckboxPosition
            value={localVacancyData.position}
            onChange={(value) => handleChange("position", value)}
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Quantidade"
            value={localVacancyData.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Descrição"
            value={localVacancyData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Benefícios"
            value={localVacancyData.benefits}
            onChange={(e) => handleChange('benefits', e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Requisitos"
            value={localVacancyData.requirements}
            onChange={(e) => handleChange('requirements', e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300"
          />
          {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
        </div>
        <div>
          <MoneyInput
            value={String(localVacancyData.salary)}
            onChange={(value) => {
              const numericValue = Number(value.replace(/\D/g, "")) / 100;
              handleChange("salary", numericValue);
            }}
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary}</p>
          )}
        </div>

        {/* <div>
          <DatePicker
            selected={
              localVacancyData.date ? new Date(localVacancyData.date) : null
            }
            onChange={(date) =>
              handleChange(
                "date",
                date ? date.toISOString().split("T")[0] : ""
              )
            }
            className="p-2 rounded bg-gray-700 text-white"
            placeholderText="Selecione uma data"
            dateFormat="dd/MM/yyyy"
            showTimeSelect={false}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date}</p>
          )}
        </div> */}

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? "Salvando..."
            : isEditMode
            ? "Atualizar Vaga"
            : "Salvar Nova Vaga"}
        </button>
      </div>
    </div>
  );
};

export default NewVacancyForm;
