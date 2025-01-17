import { useEffect, useState } from "react";
import DropdownCheckboxEstadoCivil from "../DropDown/dropdown-estadocivil";
import DropdownCheckboxGender from "../DropDown/dropdown-gender";
import { CpfMask } from "../masks/cpf";
import { RgMask } from "../masks/rg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PessoaFisicaProps } from "@/app/types/employee";

export function PessoaFisica({
  data,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: PessoaFisicaProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Validate fields
  useEffect(() => {
    const isValid =
      data.nome.trim() !== "" &&
      data.cpf.trim() !== "" &&
      data.genero.trim() !== "" &&
      data.estadoCivil.trim() !== "" &&
      data.rg.trim() !== "" &&
      data.orgaoExpedidor.trim() !== "" &&
      data.selectedDate !== null;

    setIsNextEnabled(isValid);
  }, [data]);

  const handleInputChange = (field: keyof typeof data, value: string | Date | null) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-4 w-full">
      {/* CPF */}
      <CpfMask
  value={data.cpf}
  onChange={(cpfValue) => handleInputChange("cpf", cpfValue)}
  disabled={!isEditable}
/>
      {/* Nome */}
      <div className="w-full">
        <input
          type="text"
          value={data.nome}
          onChange={(e) => handleInputChange("nome", e.target.value)}
          placeholder="Digite o nome completo"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>
      {/* Gênero */}
      <DropdownCheckboxGender
        value={data.genero}
        onChange={(value) => handleInputChange("genero", value)}
        disabled={!isEditable}
      />
      {/* Estado Civil */}
      <DropdownCheckboxEstadoCivil
        value={data.estadoCivil}
        onChange={(value) => handleInputChange("estadoCivil", value)}
        disabled={!isEditable}
      />
      {/* RG */}
      <RgMask
        value={data.rg}
        onChange={(e) => handleInputChange("rg", e.target.value)}
        disabled={!isEditable}
      />
      {/* Órgão Expedidor */}
      <div className="w-full">
        <input
          type="text"
          value={data.orgaoExpedidor}
          onChange={(e) =>
            handleInputChange("orgaoExpedidor", e.target.value)
          }
          placeholder="Digite o órgão expedidor"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>
      {/* Data de Emissão */}
      <div className="w-full">
        <DatePicker
          selected={data.selectedDate}
          onChange={(date) => handleInputChange("selectedDate", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Emissão"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>

    </div>
  );
}
