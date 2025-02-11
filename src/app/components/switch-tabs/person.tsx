"use client"

import { useEffect, useState } from "react"
import DropdownCheckboxMaritalStatus from "../DropDown/dropdown-marital-status"
import DropdownCheckboxGender from "../DropDown/dropdown-gender"
import { CpfMask } from "../masks/cpf"
import { RgMask } from "../masks/rg"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { PersonProps, PersonType } from "@/app/types/person"
import { personSchema } from "@/app/schemas/personSchema"
// import { employeeService } from "@/app/services/employeeService"
import { createEmployeeMock } from "../../../../tests/api/employeeMock"


export function PessoaFisica({
  data = {} as PersonType,
  onChange,
  isEditable = true,
  onNext,
  onPrev,
}: PersonProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof PersonType, string | null>>>({})

  // useEffect(() => {
  //   validateData(data)
  // }, [data])

  const validateData = (updatedData: PersonType) => {
    try {
      // const validatedData = personSchema.parse(updatedData)
      personSchema.parse(updatedData) // TODO:
      setErrors({})
      setIsNextEnabled(true)
    } catch (err) {
      console.error("Erro de validação:", err.errors)
      const newErrors: Record<string, string> = {}
      err.errors?.forEach((e) => {
        newErrors[e.path[0]] = e.message
      })
      setErrors(newErrors)
      setIsNextEnabled(false)
    }
  }

  const handleInputChange = (field: keyof PersonType, value: string | Date | null) => {
    const updatedData = { ...data, [field]: value };
    onChange(updatedData);
  };

          // TODO: ln:99 data.date_of_birth ? new Date(data.date_of_birth) : null - i don`t got it


  const createEmployee = async () => {
    try {
      // const createdEmployee = await employeeService.createEmployee(data)
      const createdMock = createEmployeeMock(data)
      console.log(createdMock)
      alert("Funcionário cadastrado com sucesso!")
      onNext()
    } catch (error) {
      console.error("Erro ao criar funcionário:", error)
      alert("Erro ao criar funcionário.")
    }
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-4 w-full">
      <div className="w-full">
        <input
          type="text"
          value={data.full_name || ""}
          onChange={(e) => handleInputChange("full_name", e.target.value)}
          placeholder="Digite o nome completo"
          className={`w-full bg-gray-700 text-white border ${
            errors.full_name ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
      </div>

      <CpfMask
        value={data.tax_id || ""}
        onChange={(cpfValue) => handleInputChange("tax_id", cpfValue)}
        disabled={!isEditable}
      />
      {errors.tax_id && <p className="text-red-500 text-sm mt-1">{errors.tax_id}</p>}

      <RgMask
        value={data.national_id || ""}
        onChange={(e: { target: { value: string | Date | null } }) => handleInputChange("national_id", e.target.value)}
        disabled={!isEditable}
      />
      {errors.national_id && <p className="text-red-500 text-sm mt-1">{errors.national_id}</p>}

      <div className="w-full">
        <DatePicker
          selected={data.date_of_birth ? new Date(data.date_of_birth) : null}
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

      <div className="w-full">
        <input
          type="text"
          value={data.issuing_body || ""}
          onChange={(e) => handleInputChange("issuing_body", e.target.value)}
          placeholder="Órgão Expedidor"
          className={`w-full bg-gray-700 text-white border ${
            errors.issuing_body ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3`}
          disabled={!isEditable}
        />
        {errors.issuing_body && <p className="text-red-500 text-sm mt-1">{errors.issuing_body}</p>}
      </div>

      <DropdownCheckboxGender
        value={data.gender || ""}
        onChange={(value) => handleInputChange("gender", value)}
        disabled={!isEditable}
      />
      {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}

      <DropdownCheckboxMaritalStatus
        value={data.marital_status || ""}
        onChange={(value) => handleInputChange("marital_status", value)}
        disabled={!isEditable}
      />
      {errors.marital_status && <p className="text-red-500 text-sm mt-1">{errors.marital_status}</p>}

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
  )
}
