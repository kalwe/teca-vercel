"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";
import { QuantityMask } from "@/app/components/masks/quantity";
import MoneyInput from "@/app/components/masks/salary";
import { useVagasContext } from "@/app/context/VagasContext";
import { vacancySchema, sanitizeVacancy, VacancyService, Vacancy } from "@/app/schemas/vacancySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function NovaVaga() {
  const { vacancies, updateVacancy, addVacancy } = useVagasContext();
  const searchParams = useSearchParams();
  const index = searchParams.get("index");
  const isEditMode = index !== null;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [positions, setPositions] = useState<string[]>([]);
  const [errorLoadingPositions, setErrorLoadingPositions] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<Vacancy & { salary_display: string }>({
    resolver: zodResolver(vacancySchema),
    defaultValues: {
      position: "",
      quantity: 1,
      description: "",
      requirements: "",
      benefits: "",
      salary: 0,
      salary_display: "R$ 0,00",
    },
  });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const vacanciesList = await VacancyService.getAllVacancies();
        if (!Array.isArray(vacanciesList)) throw new Error("Dados inválidos recebidos.");
        const uniquePositions = Array.from(new Set(vacanciesList.map((v) => v.position))).filter(Boolean);
        if (uniquePositions.length === 0) throw new Error("Nenhum cargo encontrado.");
        setPositions(uniquePositions);
        setErrorLoadingPositions(false);
      } catch (error) {
        console.error("Erro ao carregar cargos:", error);
        setErrorLoadingPositions(true);
      }
    };
    fetchPositions();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const vacancy = vacancies[Number(index)];
      if (vacancy) {
        reset({
          position: vacancy.position,
          quantity: vacancy.quantity,
          description: vacancy.description || "",
          requirements: vacancy.requirements || "",
          benefits: vacancy.benefits || "",
          salary: vacancy.salary,
          salary_display: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(vacancy.salary),
        });
      }
    }
  }, [index, isEditMode, vacancies, reset]);

  /**
   Manipula o envio do formulário - Cria uma nova vaga via POST
   */
  const onSubmit = async (data: Vacancy) => {
    try {
      setLoading(true);
      const validationResult = vacancySchema.safeParse(data);
      if (!validationResult.success) {
        console.error("Erro de validação Zod:", validationResult.error.format());
        alert("Erro na validação dos dados. Veja o console.");
        return;
      }

      const validatedVacancy = sanitizeVacancy(validationResult.data);

      if (isEditMode) {
        await updateVacancy(Number(index), validatedVacancy);
        alert("Vaga atualizada com sucesso.");
      } else {
        const newVacancy = await VacancyService.createVacancy(validatedVacancy);
        addVacancy(newVacancy);
        alert("Nova vaga adicionada com sucesso.");
      }

      reset();
      router.push("/vagas-display/");
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      alert("Erro ao criar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
      }}
    >
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">
          {isEditMode ? "Editar Vaga" : "Nova Vaga"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cargo Dropdown puxando da API */}
            <div>
              <DropdownCheckboxPosition
                value={watch("position")}
                onChange={(value) => setValue("position", value, { shouldValidate: true })}
                disabled={isEditMode}
                options={errorLoadingPositions ? ["Erro ao carregar"] : positions}
              />
              {errorLoadingPositions && (
                <p className="text-red-500 text-sm">Erro ao carregar cargos.</p>
              )}
              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
            </div>

            {/* Quantity Mask */}
            <div>
              <QuantityMask
                value={Number(watch("quantity")) || 1}
                onChange={(newQuantity: number) => setValue("quantity", newQuantity, { shouldValidate: true })}
                min={1}
                max={100}
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>
          </div>

          {(["description", "requirements", "benefits"] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-400">
                {field === "description" ? "Descrição" : field === "requirements" ? "Requisitos" : "Benefícios"}
              </label>
              <textarea
                {...register(field as keyof Vacancy)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500"
                placeholder={`Digite ${field === "description" ? "a descrição" : field === "requirements" ? "os requisitos" : "os benefícios"}`}
              />
              {errors[field as keyof Vacancy] && (
                <p className="text-red-500 text-sm">{errors[field as keyof Vacancy]?.message}</p>
              )}
            </div>
          ))}

          {/* Salary Input */}
          <div>
            <MoneyInput
              value={watch("salary_display")}
              onChange={(newValue) => {
                const numericValue = Number(newValue.replace(/[^\d,]/g, "").replace(",", "."));
                setValue(
                  "salary_display",
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(numericValue)
                );
                setValue("salary", numericValue, { shouldValidate: true });
              }}
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => router.push("/vagas-display/")} className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500" disabled={loading}>
              {loading ? "Salvando..." : isEditMode ? "Atualizar Vaga" : "Salvar Nova Vaga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaVaga;
