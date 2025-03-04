"use client";

import { useState } from "react";
import { employeeSchema } from "@/app/schemas/employeeSchema";
import { Employee } from "@/app/types/old/employee";
import { EmployeeService } from "@/app/services/employeeService";
import { z } from "zod";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EmployeeProps } from "@/app/types/employee";

export function Funcionario({
  data,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: EmployeeProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, string>>>({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const formatDateForBackend = (value: string | Date | null): string => {
    if (!value) return "";
    if (typeof value === "string") {
      return value.includes("-") ? value : value.replace(/\//g, "-");
    }
    if (value instanceof Date) {
      const day = String(value.getDate()).padStart(2, "0");
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const year = value.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "";
  };

  const parseDateFromBackend = (dateStr?: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const handleInputChange = (field: keyof Employee, value: unknown) => {
    let formattedValue = value;
    if ((field === "contractDate" || field === "removalDate") && value instanceof Date) {
      formattedValue = formatDateForBackend(value);
    }
    const updatedData = { ...data, [field]: formattedValue };

    try {
      employeeSchema.parse(updatedData);
      setErrors({});
      setIsNextEnabled(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof Employee, string>> = {};
        err.errors.forEach((e) => {
          newErrors[e.path[0] as keyof Employee] = e.message;
        });
        setErrors(newErrors);
        setIsNextEnabled(false);
      }
    }

    onChange(updatedData);
  };

  /**
   * Calls the EmployeeService to save the employee data and then proceeds to the next step.
   */
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

      {/* Registration Field */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Digite a matrícula</label>
        <input
          type="text"
          name="registration"
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

      {/* Cod person */}

      <div className="w-full">
        <label className="block text-gray-400 mb-2">Digite o código da pessoa</label>
        <input
          type="text"
          name="codigoFractal"
          value={data.codigoFractal || ""}
          onChange={(e) => handleInputChange("codigoFractal", e.target.value)}
          placeholder="Digite o código da pessoa"
          className={`w-full bg-gray-700 text-white border ${
            errors.codigoFractal ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.codigoFractal && <p className="text-red-500 text-sm mt-1">{errors.codigoF}</p>}
      </div>

      {/* Contract Date Field with DatePicker */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <DatePicker
          selected={parseDateFromBackend(data.contractDate)}
          onChange={(date: Date | null) => handleInputChange("contractDate", date)}
          dateFormat="dd-MM-yyyy"
          className={`w-full bg-gray-700 text-white border ${
            errors.contractDate ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.contractDate && (
          <p className="text-red-500 text-sm mt-1">{errors.contractDate}</p>
        )}
      </div>

      {/* Removal Date Field with DatePicker */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Remoção</label>
        <DatePicker
          selected={parseDateFromBackend(data.removalDate)}
          onChange={(date: Date | null) => handleInputChange("removalDate", date)}
          dateFormat="dd-MM-yyyy"
          className={`w-full bg-gray-700 text-white border ${
            errors.removalDate ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.removalDate && (
          <p className="text-red-500 text-sm mt-1">{errors.removalDate}</p>
        )}
      </div>

      {/* Dropdown for Position (using positionId as per schema) */}
      <div className="w-full">
        <DropdownCheckboxPosition
          value={data.positionId || ""}
          onChange={(value) => handleInputChange("positionId", value)}
          disabled={!isEditable}
        />
        {errors.positionId && (
          <p className="text-red-500 text-sm mt-1">{errors.positionId}</p>
        )}
      </div>

      {/* Supervisor Checkbox */}
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

      {/* Manager Checkbox */}
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

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
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
