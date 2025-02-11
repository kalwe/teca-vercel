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
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, string>>>({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Validação instantânea ao modificar os campos
  const handleInputChange = <K extends keyof Employee>(field: K, value: Employee[K]) => {
    const updatedData = { ...data, [field]: value };

    try {
      employeeSchema.parse(updatedData); // Valida os dados
      setErrors({}); // Limpa os erros ao preencher corretamente
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


  // Salva os dados do funcionário
  const createEmployee = async () => {
    try {
      employeeSchema.parse(data); // Valida antes de salvar

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
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof Employee, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof Employee] = e.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Erro ao criar funcionário:", error);
        alert("Erro ao criar funcionário.");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-full">
      <h2 className="text-white text-xl font-bold">Funcionário</h2>

      {[
        { name: "registration", label: "Matrícula", placeholder: "Digite a matrícula", type: "text" },
        { name: "contract_date", label: "Data de Admissão", placeholder: "", type: "date" },
        { name: "removal_date", label: "Data de Remoção", placeholder: "", type: "date" },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <label className="block text-gray-400 mb-2">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={data[field.name] ? new Date(data[field.name]).toISOString().split("T")[0] : ""}
            onChange={(e) => handleInputChange(field.name as keyof Employee, e.target.value)}
            placeholder={field.placeholder}
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
          onChange={(value: string) => handleInputChange("function", { id: Number(value) || null })}
          disabled={!isEditable}
        />
        {errors.function && <p className="text-red-500 text-sm mt-1">{errors.function}</p>}
      </div>

      {/* Checkboxes */}
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

      {/* Botões */}
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
