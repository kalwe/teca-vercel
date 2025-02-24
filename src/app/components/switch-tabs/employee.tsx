"use client";

import { useState } from "react";
import { employeeSchema } from "@/app/schemas/employeeSchema";
import { Employee } from "@/app/types/old/employee";
import { EmployeeService } from "@/app/services/employeeService";
import { z } from "zod";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EmployeeProps } from "@/app/types/employee"; // Make sure this matches your file structure

/**
 * Funcionario component renders the employee fields and integrates with the backend.
 * It validates data using employeeSchema and updates the UI accordingly.
 *
 * @param data - The current employee data.
 * @param onChange - Callback to update the employee data.
 * @param isEditable - Flag indicating whether the form is editable.
 * @param onNext - Callback to proceed to the next step.
 * @param onPrev - Callback to return to the previous step.
 */
export function Funcionario({
  data,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: EmployeeProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, string>>>({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  /**
   * Formats a Date or string value into the "dd-MM-yyyy" format required by the backend.
   *
   * @param value - The date value as a Date object or a string.
   * @returns A formatted date string.
   */
  const formatDateForBackend = (value: string | Date | null): string => {
    if (!value) return "";
    if (typeof value === "string") {
      // If the string already has dashes assume it's in the correct format,
      // otherwise replace slashes with dashes.
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

  /**
   * Parses a backend date string ("dd-MM-yyyy") into a Date object.
   *
   * @param dateStr - The date string from the backend.
   * @returns A Date object or null if the string is invalid.
   */
  const parseDateFromBackend = (dateStr?: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  /**
   * Handles input changes by updating the employee data and validating it against the schema.
   *
   * @param field - The employee field to update.
   * @param value - The new value for the field.
   */
  const handleInputChange = (field: keyof Employee, value: unknown) => {
    let formattedValue = value;
    if ((field === "contractDate" || field === "removalDate") && value instanceof Date) {
      formattedValue = formatDateForBackend(value);
    }
    const updatedData = { ...data, [field]: formattedValue };

    try {
      employeeSchema.parse(updatedData); // Validate updated data
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
