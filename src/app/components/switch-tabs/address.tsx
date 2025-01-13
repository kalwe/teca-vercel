import { useEffect, useState } from "react";
import CepMask from "../masks/cep";


interface AddressProps {
  data: {
    logradouro: string;
    bairro: string;
    cep: string;
    estado: string;
    municipio: string;
  };
  onChange: (updatedData: AddressProps["data"]) => void;
  onValid?: (isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Address({
  data,
  onChange,
  onValid,
  onNext,
  onPrev,
}: AddressProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Validação dos campos
  useEffect(() => {
    const isValid =
      (data.logradouro?.trim() || "") !== "" &&
      (data.bairro?.trim() || "") !== "" &&
      (data.cep?.trim() || "") !== "" &&
      (data.estado?.trim() || "") !== "" &&
      (data.municipio?.trim() || "") !== "";

    setIsNextEnabled(isValid); // Habilita ou desabilita o botão "Próximo"

    if (onValid) {
      onValid(isValid);
    }
  }, [data, onValid]);

  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-[100%]">
      {/* Logradouro */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Logradouro</label>
        <input
          type="text"
          value={data.logradouro || ""}
          onChange={(e) => handleInputChange("logradouro", e.target.value)}
          placeholder="Digite o logradouro"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Bairro */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Bairro</label>
        <input
          type="text"
          value={data.bairro || ""}
          onChange={(e) => handleInputChange("bairro", e.target.value)}
          placeholder="Digite o bairro"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* CEP */}
      <div className="w-full">

        <CepMask
  value={data.cep} // Passa o valor atual do CEP
  onChange={(value) => handleInputChange("cep", value)} // Atualiza o estado no componente pai
/>
      </div>
      {/* Estado */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Estado</label>
        <select
          value={data.estado || ""}
          onChange={(e) => handleInputChange("estado", e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecione o estado</option>
          <option value="SP">São Paulo</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="MG">Minas Gerais</option>
          <option value="RS">Rio Grande do Sul</option>
          {/* Adicione outros estados conforme necessário */}
        </select>
      </div>
      {/* Município */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Município</label>
        <input
          type="text"
          value={data.municipio || ""}
          onChange={(e) => handleInputChange("municipio", e.target.value)}
          placeholder="Digite o município"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
