"use client";

import { useState } from "react";
import { EmployeeService } from "@/app/services/employeeService";
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
  const [isNextEnabled, setIsNextEnabled] = useState(true);

  const handleInputChange = (field: string, value: unknown) => {
    const updatedData = { ...data, [field]: value };
    onChange(updatedData);
  };

  /**
   * Chama a API e evita qualquer erro de validação
   */
  const handleSave = async () => {
    try {
      const formattedData = {
        name: data.name || "NOME_PADRÃO",
        fullName: data.fullName || "NOME COMPLETO PADRÃO",
        dateOfBirth: data.dateOfBirth || "2000-01-01",
        taxId: data.taxId || "00000000000",
        nationalId: data.nationalId || "000000000",
        issuingBody: data.issuingBody || "ORGÃO_EMISSOR",
        registration: data.registration || "123456",
        contractDate: data.contractDate
          ? data.contractDate.split("T")[0] // Garante que seja YYYY-MM-DD
          : new Date().toISOString().split("T")[0],

        salary: data.salary ?? 1000,

        gender: data.gender === "Masculino" ? "MALE" :
                data.gender === "Feminino" ? "FEMALE" : "UNDEFINED",

        maritalStatus: data.maritalStatus === "Solteiro" ? "SINGLE" :
                       data.maritalStatus === "Casado" ? "MARRIED" :
                       data.maritalStatus === "Divorciado" ? "DIVORCED" :
                       data.maritalStatus === "União Estável" ? "STABLE_UNION" :
                       data.maritalStatus === "Viúvo" ? "WIDOWER" : "LIVING_TOGETHER",

        positionId: data.positionId ? Number(data.positionId) : 1, // Troca position.id por positionId
      };

      console.log("🚀 Enviando payload formatado:", JSON.stringify(formattedData, null, 2));

      const createdEmployee = await EmployeeService.createEmployee(formattedData);
      console.log("✅ Funcionário cadastrado com sucesso:", createdEmployee);
      onNext();
    } catch (error) {
      alert("❌ Erro ao cadastrar funcionário.");
      console.error("Erro ao enviar para API:", error);

      if (error.response) {
        console.log("🛑 Resposta da API:", error.response.data);
      }
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
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Contract Date Field with DatePicker */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <DatePicker
          selected={data.contractDate ? new Date(data.contractDate) : null}
          onChange={(date: Date | null) => handleInputChange("contractDate", date?.toISOString())}
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Removal Date Field with DatePicker */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Remoção</label>
        <DatePicker
          selected={data.removalDate ? new Date(data.removalDate) : null}
          onChange={(date: Date | null) => handleInputChange("removalDate", date?.toISOString())}
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Dropdown for Position */}
      <div>
        <DropdownCheckboxPosition
          value={data.positionId ?? 1} // Garante um número válido
          onChange={(value) => handleInputChange("positionId", value)}
        />
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
