import { useEffect, useRef, useState } from "react";
import DropdownCheckboxEstadoCivil from "../DropDown/dropdown-estadocivil";
import DropdownCheckboxGender from "../DropDown/dropdown-gender";
import { CpfMask } from "../masks/cpf";
import { RgMask } from "../masks/rg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormData } from "@/app/context/FormDataContext";

interface PessoaFisicaProps {
  onNext: () => void; // Função chamada ao clicar em "Próximo"
  onPrev: () => void; // Função chamada ao clicar em "Voltar"
  isEditable: boolean; // Controla se os campos são editáveis
}

export function PessoaFisica({ onNext, onPrev, isEditable }: PessoaFisicaProps) {
  const { formData, updateFormData } = useFormData(); // Usa o contexto centralizado
  const datePickerRef = useRef<DatePicker | null>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false); // Controla o estado do botão "Próximo"

  // Validação dos campos
  useEffect(() => {
    const isValid =
      formData.pessoaFisica.nome.trim() !== "" &&
      formData.pessoaFisica.cpf.trim() !== "" &&
      formData.pessoaFisica.genero.trim() !== "" &&
      formData.pessoaFisica.estadoCivil.trim() !== "" &&
      formData.pessoaFisica.rg.trim() !== "" &&
      formData.pessoaFisica.orgaoExpedidor.trim() !== "" &&
      formData.pessoaFisica.selectedDate !== null;

    setIsNextEnabled(isValid); // Habilita ou desabilita o botão
  }, [formData.pessoaFisica]);

  // Função para atualizar os dados no contexto
  const handleInputChange = (
    field: keyof typeof formData.pessoaFisica,
    value: string | Date | null
  ) => {
    if (isEditable) {
      updateFormData("pessoaFisica", { [field]: value }); // Atualiza o contexto
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-4 w-full">
      {/* CPF */}
      <CpfMask
        value={formData.pessoaFisica.cpf}
        onChange={(e: { target: { value: string } }) =>
          handleInputChange("cpf", e.target.value)
        }
        disabled={!isEditable} // Desativa o campo se não for editável
      />
      {/* Nome */}
      <div className="w-full">
        <input
          type="text"
          value={formData.pessoaFisica.nome}
          onChange={(e) => handleInputChange("nome", e.target.value)}
          placeholder="Digite o nome completo"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable} // Desativa o campo se não for editável
        />
      </div>
      {/* Gênero */}
      <DropdownCheckboxGender
        value={formData.pessoaFisica.genero}
        onChange={(value) => handleInputChange("genero", value)}
        disabled={!isEditable} // Desativa o campo se não for editável
      />
      {/* Estado Civil */}
      <DropdownCheckboxEstadoCivil
        value={formData.pessoaFisica.estadoCivil || ""}
        onChange={(value) => handleInputChange("estadoCivil", value)}
        disabled={!isEditable} // Desativa o campo se não for editável
      />
      {/* RG */}
      <RgMask
        value={formData.pessoaFisica.rg || ""}
        onChange={(e) => handleInputChange("rg", e.target.value)}
        disabled={!isEditable} // Desativa o campo se não for editável
      />
      {/* Órgão Expedidor */}
      <div className="w-full">
        <input
          type="text"
          value={formData.pessoaFisica.orgaoExpedidor}
          onChange={(e) =>
            handleInputChange("orgaoExpedidor", e.target.value)
          }
          placeholder="Digite o órgão expedidor"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable} // Desativa o campo se não for editável
        />
      </div>
      {/* Data de Emissão */}
      <div className="w-full">
        <DatePicker
          selected={formData.pessoaFisica.selectedDate}
          onChange={(date) => handleInputChange("selectedDate", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Emissão"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          ref={datePickerRef}
          disabled={!isEditable} // Desativa o campo se não for editável
        />
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
          disabled={!isNextEnabled || !isEditable} // Botão "Próximo" desativado se não for editável
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
