"use client";

import { useState, useEffect } from "react";
// import { employeeSchema } from "@/app/schemas/employeeSchema"; // TODO: deveria usar mas nao usa
import { EmployeeType } from "@/app/types/employee";
import { EmployeeService } from "@/app/services/employeeService";
import { z } from "zod";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FuncionarioProps } from "@/app/types/funcionario";

export function Funcionario({
  data = {} as EmployeeType,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: FuncionarioProps) { // TODO: tira a interface FuncionaioProps ela seta 'data' como FuncionarioType que nao todos os fields usados
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeType, string>>>({});

  // Comunica o estado do botão para o ContractForm
  useEffect(() => {
    setNextEnabled(isNextEnabled); // TODO: variavel isNextEnable nao existe
  }, [isNextEnabled, setNextEnabled]);

  const handleInputChange = (field: keyof EmployeeType, value: unknown) => {
    let formattedValue = value;
    if ((field === "contractDate" || field === "removalDate") && value instanceof Date) {
      formattedValue = formatDateForBackend(value); // TODO: formatDataForBackend() nao existe
    }
    data.positionId = data.position?.id
    console.log(data.position)
    const updatedData = { ...data, [field]: formattedValue };
    try {
      EmployeeType.parse(updatedData); // TODO: EmployeeType nao eh um schema do zod, nao existe o method parse
      setErrors({});

    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof EmployeeType, string>> = {};
        err.errors.forEach((e) => {
          newErrors[e.path[0] as keyof EmployeeType] = e.message;
        });
        setErrors(newErrors);

      }
    }

    onChange(updatedData);
  };

  /**
   * Faz o POST na API e avança para a próxima etapa
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
          // TODO: nao da pra usar errors.registration aqui vamos arrumar me chama na call
          className={w-full bg-gray-700 text-white border ${
            errors.registration ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3}
          disabled={!isEditable}
        />
        {errors.registration && <p className="text-red-500 text-sm mt-1">{errors.registration}</p>}
      </div>

      {/* Contract Date Field with DatePicker */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <DatePicker
          selected={parseDateFromBackend(data.contractDate)} // TODO: da onde vem o method parseDateFromBackend ?!?!?!
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
          selected={parseDateFromBackend(data.removalDate)} // TODO: da onde vem o method parseDateFromBackend ?!?!?!
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
      {/* Dropdown for Position */}
      <div className="w-full">
        <DropdownCheckboxPosition
          id={data.position?.name ?? ''}
          onChange={(id, name) => handleInputChange("position", {id: id, name: name})}
          disabled={!isEditable} // TODO: verificar no componente DropdownCheckboxPosition pq nao recebe desable
        />
        {errors.positionId && (
          <p className="text-red-500 text-sm mt-1">{errors.positionId}</p>
        )}
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
        // TODO: arruma INDENTACAO
  onClick={handleSave}
  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
>
  Próximo
</button>

      </div>
    </div>
  );
}
