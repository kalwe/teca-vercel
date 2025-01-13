import { useEffect, useState } from "react";

interface ContactProps {
  data: {
    tipoContato: string;
    informacao: string;
  };
  onChange: (updatedData: ContactProps["data"]) => void;
  onValid?: (isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Contact({
  data,
  onChange,
  onValid,
  onNext,
  onPrev,
}: ContactProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Validação dos campos
  useEffect(() => {
    const isValid =
      (data.tipoContato?.trim() || "") !== "" &&
      (data.informacao?.trim() || "") !== "";

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
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-[100%]">
      {/* Tipo de Contato */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tipo de Contato</label>
        <select
          value={data.tipoContato || ""}
          onChange={(e) => handleInputChange("tipoContato", e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Selecione --</option>
          <option value="email">E-mail</option>
          <option value="telefone">Telefone</option>
          <option value="website">Website</option>
        </select>
      </div>
      {/* Informação */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Informação</label>
        <input
          type="text"
          value={data.informacao || ""}
          onChange={(e) => handleInputChange("informacao", e.target.value)}
          placeholder="Digite o contato"
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
