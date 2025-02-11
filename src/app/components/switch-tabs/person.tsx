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
  employee,
}: PersonProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof PersonType, string>>>({})
  const [isNextEnabled, setIsNextEnabled] = useState(false)

  // Converte a data do formato do DatePicker para "dd-MM-yyyy"
  const formatDateForBackend = (date: Date | null) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // ✅ Certifica que o formato é "dd-MM-yyyy"
  };

  const handleInputChange = (field: keyof PersonType, value: string | Date | null) => {
    let formattedValue = value;

    if (field === "date_of_birth" && value instanceof Date) {
      formattedValue = formatDateForBackend(value); // ✅ Converte antes de atualizar o estado
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
    try {
      const createdPerson = await EmployeeService.createEmployee({ ...data, employee });
      console.log(createdPerson);
      onNext();
    } catch (error) {
      alert("Erro ao salvar dados pessoais. Verifique os campos.");
      console.error(error);
    }
  };


  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Pessoa Física</h2>

      {[
        { name: "full_name", label: "Nome Completo", placeholder: "Digite o nome completo" },
        { name: "tax_id", label: "CPF", placeholder: "Digite o CPF xxxxxx-xx" },
        { name: "national_id", label: "RG", placeholder: "Digite o RG" },
        { name: "issuing_body", label: "Órgão Expedidor", placeholder: "Órgão Expedidor" },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <label className="block text-gray-400 mb-2">{field.label}</label>
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
        <label className="block text-gray-400 mb-2">Data de Nascimento</label>
        <DatePicker
          selected={data.date_of_birth ? new Date(data.date_of_birth.split("-").reverse().join("-")) : null}
          onChange={(date) => handleInputChange("date_of_birth", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Nascimento"
          className={`w-full bg-gray-700 text-white border ${
            errors.date_of_birth ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
      </div>

      {/* Gênero */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Gênero</label>
        <DropdownCheckboxGender
          value={data.gender || ""}
          onChange={(value) => handleInputChange("gender", value)}
          disabled={!isEditable}
        />
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      {/* Estado Civil */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Estado Civil</label>
        <DropdownCheckboxMaritalStatus
          value={data.marital_status || ""}
          onChange={(value) => handleInputChange("marital_status", value)}
          disabled={!isEditable}
        />
        {errors.marital_status && <p className="text-red-500 text-sm mt-1">{errors.marital_status}</p>}
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
