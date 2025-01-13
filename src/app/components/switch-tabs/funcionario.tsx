import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownCheckboxFuncao from "../DropDown/dropdown-funcao";
import { useFormData } from "@/app/context/FormDataContext";

interface FuncionarioProps {
  onNext: () => void; // Navegar para a próxima aba
  onPrev: () => void; // Navegar para a aba anterior
}

export function Funcionario({ onNext, onPrev }: FuncionarioProps) {
  const { formData, updateFormData } = useFormData(); // Usa o contexto
  const [isNextEnabled, setIsNextEnabled] = useState(false); // Controla o botão "Próximo"

  // Validação dos campos
  useEffect(() => {
    const isValid =
      formData.funcionario?.matricula.trim() !== "" &&
      formData.funcionario?.admissionDate !== null &&
      formData.funcionario?.funcao.trim() !== "";

    setIsNextEnabled(isValid); // Habilita ou desabilita o botão
  }, [formData.funcionario]);

  // Atualiza os dados no contexto
  const handleInputChange = (
    field: keyof typeof formData.funcionario,
    value: string | boolean | Date | null
  ) => {
    updateFormData("funcionario", { [field]: value });
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-[100%]">
      {/* Matrícula */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Matrícula</label>
        <input
          type="text"
          value={formData.funcionario?.matricula || ""}
          onChange={(e) => handleInputChange("matricula", e.target.value)}
          placeholder="Digite a matrícula"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Data de Admissão */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <DatePicker
          selected={formData.funcionario?.admissionDate || null}
          onChange={(date) => handleInputChange("admissionDate", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Admissão"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Data de Remoção */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Remoção</label>
        <DatePicker
          selected={formData.funcionario?.removalDate || null}
          onChange={(date) => handleInputChange("removalDate", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Remoção"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Função */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Função</label>
        <DropdownCheckboxFuncao
          value={formData.funcionario?.funcao || ""}
          onChange={(value: string) => handleInputChange("funcao", value)}
        />
      </div>
      {/* Checkboxes */}
      <div className="flex items-center space-x-4">
  <div className="flex items-center">
    <input
      type="checkbox"
      id="encarregado"
      checked={formData.funcionario?.encarregado || false}
      onChange={(e) => handleInputChange("encarregado", e.target.checked)}
      className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-green-500"
    />
    <label htmlFor="encarregado" className="ml-2 text-white">
      Encarregado
    </label>
  </div>
  <div className="flex items-center">
    <input
      type="checkbox"
      id="gerente"
      checked={formData.funcionario?.gerente || false}
      onChange={(e) => handleInputChange("gerente", e.target.checked)}
      className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-green-500"
    />
    <label htmlFor="gerente" className="ml-2 text-white">
      Gerente
    </label>
  </div>
</div>

      {/* Botões de Navegação */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
        >
          Voltar
        </button>
        <button
          onClick={isNextEnabled ? onNext : undefined}
          disabled={!isNextEnabled}
          className={`px-4 py-2 rounded-md text-white ${
            isNextEnabled
              ? "bg-green-600 hover:bg-green-500"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
