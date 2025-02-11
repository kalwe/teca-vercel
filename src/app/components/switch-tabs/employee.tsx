"use client";

import { useEffect, useState } from "react";
import { employeeSchema } from "@/app/schemas/employeeSchema";
import { Employee } from "@/app/types/employee";
import { EmployeeService } from "@/app/services/employeeService";
import DropdownCheckboxFuncao from "../DropDown/dropdown-role";

export function Funcionario({
  data = {} as Employee,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: {
  data: Employee;
  onChange: (updatedData: Employee) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const validationResult = employeeSchema.safeParse(data);
    if (validationResult.success) {
      setErrors({});
      setIsNextEnabled(true);
    } else {
      console.error("Erro de validação:", validationResult.error.errors);
      const validationErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((e) => {
        validationErrors[e.path[0]] = e.message;
      });
      setErrors(validationErrors);
      setIsNextEnabled(false);
    }
  }, [data]);

  const handleInputChange = (field: keyof Employee, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const createEmployee = async () => {
    try {
      const validationResult = employeeSchema.safeParse(data);
      if (!validationResult.success) {
        console.error("Erro de validação Zod:", validationResult.error.format());
        alert("Erro na validação dos dados. Veja o console.");
        return;
      }

      const formattedData: Employee = {
        ...data,
        function: {
          id: data.function?.id ? String(data.function.id) : "",
          name: data.function?.name,
        },
        contract_date: data.contract_date || null,
        removal_date: data.removal_date || null,
      };

      await EmployeeService.createEmployee(formattedData);
      alert("Funcionário cadastrado com sucesso!");
      onNext();
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      alert("Erro ao criar funcionário.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-full">
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Matrícula</label>
        <input
          type="text"
          value={data.registration || ""}
          onChange={(e) => handleInputChange("registration", e.target.value)}
          placeholder="Digite a matrícula"
          className={`w-full bg-gray-700 text-white border ${
            errors.registration ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.registration && <p className="text-red-500 text-sm mt-1">{errors.registration}</p>}
      </div>

      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <input
          type="date"
          value={data.contract_date ? new Date(data.contract_date).toISOString().split("T")[0] : ""}
          onChange={(e) => handleInputChange("contract_date", e.target.value)}
          className={`w-full bg-gray-700 text-white border ${
            errors.contract_date ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.contract_date && <p className="text-red-500 text-sm mt-1">{errors.contract_date}</p>}
      </div>

      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Remoção</label>
        <input
          type="date"
          value={data.removal_date ? new Date(data.removal_date).toISOString().split("T")[0] : ""}
          onChange={(e) => handleInputChange("removal_date", e.target.value)}
          className={`w-full bg-gray-700 text-white border ${
            errors.removal_date ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.removal_date && <p className="text-red-500 text-sm mt-1">{errors.removal_date}</p>}
      </div>

      <div className="w-full">
        <label className="block text-gray-400 mb-2">Função</label>
        <DropdownCheckboxFuncao
          value={data.function?.id || ""}
          onChange={(value: string) => handleInputChange("function", { id: Number(value) || null })}
          disabled={!isEditable}
        />
        {errors.function && <p className="text-red-500 text-sm mt-1">{errors.function}</p>}
      </div>

      <div className="w-full flex items-center">
        <input
          type="checkbox"
          checked={data.supervisor || false}
          onChange={(e) => handleInputChange("supervisor", e.target.checked)}
          className="mr-2"
          disabled={!isEditable}
        />
        <label className="text-gray-400">Encarregado</label>
      </div>

      <div className="w-full flex items-center">
        <input
          type="checkbox"
          checked={data.manager || false}
          onChange={(e) => handleInputChange("manager", e.target.checked)}
          className="mr-2"
          disabled={!isEditable}
        />
        <label className="text-gray-400">Gerente</label>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>
        <button
          onClick={createEmployee}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={!isNextEnabled}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
