"use client";

import { useState } from "react";
import { employeeSchema } from "@/app/schemas/employeeSchema";
import { Employee } from "@/app/types/employee";
import { EmployeeService } from "@/app/services/employeeService";
import DropdownCheckboxFuncao from "../DropDown/dropdown-role";
import { z } from "zod";

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
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, string>>>({});

  // Atualiza estado e valida os dados
  const handleInputChange = (field: keyof Employee, value: unknown) => {
    const updatedData = { ...data, [field]: value };

    try {
      employeeSchema.parse(updatedData); // Valida os dados
      setErrors({}); // Limpa erros ao preencher corretamente
      setIsNextEnabled(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof Employee, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof Employee] = e.message;
        });
        setErrors(newErrors);
        setIsNextEnabled(false);
      }
    }

    onChange(updatedData);
  };

  // Função para conversão segura de datas para `input[type="date"]`
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    return dateString.length === 10 ? dateString : ""; // Garante que a data já esteja no formato YYYY-MM-DD
  };

  // Salvar funcionário e avançar
  const handleSave = async () => {
    try {
      const createdEmployee = await EmployeeService.createEmployee(data);
      console.log(createdEmployee);
      onNext();
    } catch (error) {
      alert("Erro ao cadastrar funcionário. Verifique os campos.");
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Funcionário</h2>

      {/* Matrícula */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Código de Funcionário</label>
        <input
          type="text"
          name="registration"
          value={data.registration || ""}
          onChange={(e) => handleInputChange("registration", e.target.value)}
          placeholder="Digite o código do funcionário"
          className={`w-full bg-gray-700 text-white border ${
            errors.registration ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.registration && <p className="text-red-500 text-sm mt-1">{errors.registration}</p>}
      </div>

      {/* Data de Admissão e Remoção */}
      {[
        { name: "contract_date", label: "Data de Admissão", type: "date" },
        { name: "removal_date", label: "Data de Remoção", type: "date" },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <label className="block text-gray-400 mb-2">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formatDateForInput(data[field.name] as string)}
            onChange={(e) => handleInputChange(field.name as keyof Employee, e.target.value)}
            className={`w-full bg-gray-700 text-white border ${
              errors[field.name] ? "border-red-500" : "border-gray-600"
            } rounded-lg py-2 px-3`}
            disabled={!isEditable}
          />
          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      {/* Dropdown de Função */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Função</label>
        <DropdownCheckboxFuncao
          value={data.function?.id || ""}
          onChange={(value: string) =>
            handleInputChange("function", { id: Number(value) || null, name: data.function?.name })
          }
          disabled={!isEditable}
        />
        {errors.function && <p className="text-red-500 text-sm mt-1">{errors.function}</p>}
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col space-y-2">
        <div className="w-full flex items-center">
          <input
            type="checkbox"
            checked={!!data.supervisor}
            onChange={(e) => handleInputChange("supervisor", e.target.checked)}
            className="mr-2"
            disabled={!isEditable}
          />
          <label className="text-gray-400">Encarregado</label>
        </div>

        <div className="w-full flex items-center">
          <input
            type="checkbox"
            checked={!!data.manager}
            onChange={(e) => handleInputChange("manager", e.target.checked)}
            className="mr-2"
            disabled={!isEditable}
          />
          <label className="text-gray-400">Gerente</label>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={!isNextEnabled}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
