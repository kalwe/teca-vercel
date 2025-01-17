import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownCheckboxFuncao from "../DropDown/dropdown-funcao";
import { FuncionarioData, FuncionarioProps } from "@/app/types/employee";
import { matriculaSchema } from "@/app/schemas/employee/matriculaSchema";

export function Funcionario({
  data,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: FuncionarioProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate fields to enable/disable the "Next" button
  useEffect(() => {
    const isValid =
      (data.matricula?.trim() || "") !== "" &&
      data.admissionDate !== null &&
      (data.funcao?.trim() || "") !== "";
    setIsNextEnabled(isValid);
  }, [data]);

  // Handle field updates and validate matrícula
  const handleInputChange = (field: keyof FuncionarioData, value: any) => {
    if (field === "matricula") {
      try {
        matriculaSchema.parse(value); // Valida a matrícula
        setError(null); // Sem erro
        onChange({ ...data, [field]: value }); // Atualiza o campo
      } catch (err: any) {
        setError(err.errors[0].message); // Exibe mensagem de erro
      }
    } else {
      onChange({ ...data, [field]: value });
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-[100%]">
      {/* Matrícula */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Matrícula</label>
        <input
          type="text"
          value={data.matricula || ""}
          onChange={(e) => handleInputChange("matricula", e.target.value)}
          placeholder="Digite a matrícula"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Data de Admissão */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <DatePicker
          selected={data.admissionDate}
          onChange={(date) => handleInputChange("admissionDate", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Admissão"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>

      {/* Data de Remoção */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Remoção</label>
        <DatePicker
          selected={data.removalDate}
          onChange={(date) => handleInputChange("removalDate", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Remoção"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>

      {/* Função */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Função</label>
        <DropdownCheckboxFuncao
          value={data.funcao || ""}
          onChange={(value: string) => handleInputChange("funcao", value)}
          disabled={!isEditable}
        />
      </div>

      {/* Checkboxes */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="encarregado"
            checked={data.encarregado || false}
            onChange={(e) => handleInputChange("encarregado", e.target.checked)}
            className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-green-500"
            disabled={!isEditable}
          />
          <label htmlFor="encarregado" className="ml-2 text-white">
            Encarregado
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="gerente"
            checked={data.gerente || false}
            onChange={(e) => handleInputChange("gerente", e.target.checked)}
            className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-green-500"
            disabled={!isEditable}
          />
          <label htmlFor="gerente" className="ml-2 text-white">
            Gerente
          </label>
        </div>
      </div>

    </div>
  );
}
