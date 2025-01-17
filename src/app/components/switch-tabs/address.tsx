import { useEffect, useState } from "react";
import CepMask from "../masks/cep";
import { AddressData, AddressProps } from "@/app/types/employee";


export function Address({
  data = {
    logradouro: "",
    bairro: "",
    cep: "",
    estado: "",
    municipio: "",
  },
  onChange,
  isEditable,
  onNext,
  onPrev,
}: AddressProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Ensure default values for data fields
  const currentData: AddressData = {
    logradouro: data.logradouro || "",
    bairro: data.bairro || "",
    cep: data.cep || "",
    estado: data.estado || "",
    municipio: data.municipio || "",
  };

  // Validation of required fields
  useEffect(() => {
    const isValid =
      currentData.logradouro.trim() !== "" &&
      currentData.bairro.trim() !== "" &&
      currentData.cep.trim() !== "" &&
      currentData.estado.trim() !== "" &&
      currentData.municipio.trim() !== "";
    setIsNextEnabled(isValid);
  }, [currentData]);

  const handleInputChange = (field: keyof AddressData, value: string) => {
    onChange({ ...currentData, [field]: value });
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-[100%]">
      {/* Logradouro */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Logradouro</label>
        <input
          type="text"
          value={currentData.logradouro}
          onChange={(e) => handleInputChange("logradouro", e.target.value)}
          placeholder="Digite o logradouro"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>

      {/* Bairro */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Bairro</label>
        <input
          type="text"
          value={currentData.bairro}
          onChange={(e) => handleInputChange("bairro", e.target.value)}
          placeholder="Digite o bairro"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>

      {/* CEP */}
      <div className="w-full">

        <CepMask
          value={currentData.cep}
          onChange={(value) => handleInputChange("cep", value)}
          disabled={!isEditable}
        />
      </div>

      {/* Estado */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Estado</label>
        <select
  value={currentData.estado}
  onChange={(e) => handleInputChange("estado", e.target.value)}
  className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  disabled={!isEditable}
>
  <option value="">Selecione o estado</option>
  <option value="AC">Acre</option>
  <option value="AL">Alagoas</option>
  <option value="AP">Amapá</option>
  <option value="AM">Amazonas</option>
  <option value="BA">Bahia</option>
  <option value="CE">Ceará</option>
  <option value="DF">Distrito Federal</option>
  <option value="ES">Espírito Santo</option>
  <option value="GO">Goiás</option>
  <option value="MA">Maranhão</option>
  <option value="MT">Mato Grosso</option>
  <option value="MS">Mato Grosso do Sul</option>
  <option value="MG">Minas Gerais</option>
  <option value="PA">Pará</option>
  <option value="PB">Paraíba</option>
  <option value="PR">Paraná</option>
  <option value="PE">Pernambuco</option>
  <option value="PI">Piauí</option>
  <option value="RJ">Rio de Janeiro</option>
  <option value="RN">Rio Grande do Norte</option>
  <option value="RS">Rio Grande do Sul</option>
  <option value="RO">Rondônia</option>
  <option value="RR">Roraima</option>
  <option value="SC">Santa Catarina</option>
  <option value="SP">São Paulo</option>
  <option value="SE">Sergipe</option>
  <option value="TO">Tocantins</option>
</select>

      </div>

      {/* Município */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Município</label>
        <input
          type="text"
          value={currentData.municipio}
          onChange={(e) => handleInputChange("municipio", e.target.value)}
          placeholder="Digite o município"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        />
      </div>


    </div>
  );
}
