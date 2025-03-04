"use client"

import { useState } from "react"
import DropdownCheckboxMaritalStatus from "../DropDown/dropdown-marital-status"
import DropdownCheckboxGender from "../DropDown/dropdown-gender"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { PersonProps, PersonType } from "@/app/types/person"
import { personSchema } from "@/app/schemas/personSchema"
import { EmployeeService } from "@/app/services/employeeService"
import { z } from "zod"

export function PessoaFisica({
  data = {} as PersonType,
  onChange,
  isEditable,
  onNext,
  onPrev,

}: PersonProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof PersonType, string>>>({})
  const [isNextEnabled, setIsNextEnabled] = useState(false)


  const formatDateForBackend = (date: Date | null) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleInputChange = (field: keyof PersonType, value: string | Date | null) => {
    let formattedValue = value;

    if (field === "dateOfBirth" && value instanceof Date) {
      formattedValue = formatDateForBackend(value);
    }

    const updatedData = { ...data, [field]: formattedValue };

    try {
      personSchema.parse(updatedData);
      setErrors({});
      setIsNextEnabled(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          newErrors[e.path[0] as keyof PersonType] = e.message;
        });
        setErrors(newErrors);
        setIsNextEnabled(false);
      }
    }

    onChange(updatedData);
  };

  const handleSave = async () => {
      onNext();
  };
  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Pessoa Física</h2>

      {[
  { key: "name", name: "name", label: "Digite o nome", placeholder: "Digite o nome" },
  { key: "fullName", name: "fullName", label: "Digite o sobrenome", placeholder: "Digite o sobrenome" },
  { key: "taxId", name: "taxId", label: "CPF", placeholder: "Digite o CPF xxxxxx-xx" },
  { key: "nationalId", name: "nationalId", label: "RG", placeholder: "Digite o RG" },
  { key: "issuingBody", name: "issuingBody", label: "Órgão Expedidor", placeholder: "Órgão Expedidor" },
].map((field) => (
  <div key={field.key} className="w-full">


          <input
            type="text"
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleInputChange(field.name as keyof PersonType, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full bg-gray-700 text-white border ${
              errors[field.name] ? "border-red-500" : "border-gray-600"
            } rounded-lg py-2 px-3`}
            disabled={!isEditable}
          />
          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      {/* Data de nascimento */}
      <div className="w-full">

        <DatePicker
          selected={data.dateOfBirth ? new Date(data.dateOfBirth.split("-").reverse().join("-")) : null}
          onChange={(date) => handleInputChange("dateOfBirth", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Nascimento"
          className={`w-full bg-gray-700 text-white border ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
      </div>

      {/* Gênero */}
      <div className="w-full">

        <DropdownCheckboxGender
          value={data.gender || ""}
          onChange={(value) => handleInputChange("gender", value)}
          disabled={!isEditable}
        />
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      {/* Estado Civil */}
      <div className="w-full">

        <DropdownCheckboxMaritalStatus
          value={data.maritalStatus || ""}
          onChange={(value) => handleInputChange("maritalStatus", value)}
          disabled={!isEditable}
        />
        {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"

        >
          Próximo
        </button>
      </div>
    </div>
  );
}
