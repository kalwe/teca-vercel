import { useEffect, useState } from "react";

interface BankProps {
  data: {
    banco: string;
    agencia: string;
    conta: string;
    tipoConta: string;
  };
  onChange: (updatedData: BankProps["data"]) => void;
  onValid?: (isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Bank({
  data,
  onChange,
  onValid,
  onNext,
  onPrev,
}: BankProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const bancos = [
    "Banco BMG",
    "Banco Bradesco",
    "Banco BRB",
    "Banco Citibank",
    "Banco Cooperativo Sicredi S.A.",
    "Banco da Amazônia",
    "Banco do Brasil",
    "BANCO DO NORDESTE DO BRASIL S.A.",
    "Banco ItaúBank",
    "BANCO ITI",
    "BANCO NEON",
    "BANCO PAN",
    "Banco Santander",
    "Banco Votorantim",
    "BANCO WILL",
    "C6 BANK",
    "Caixa Econômica Federal",
    "CAIXA FAZ CENTENARIO",
    "DANIEL/DAPLAN",
    "EDENRED TICKET EMPRESARIAL",
    "HSBC Bank Brasil",
    "Inter - INTERMEDIUM S.A.",
    "Itaú Unibanco",
    "MERCADO PAGO",
    "Nubank",
    "PAGBANK PAGSEGURO",
    "PEDRO RABITO",
    "PICPAY SERVIÇOS S.A",
    "Sicoob",
    "SUPER PAGAMENTOS",
    "TECA",
    "Unicred",
  ];

  const tiposConta = ["Conta Corrente", "Conta Poupança", "Conta Salário"];

  // Validação dos campos
  useEffect(() => {
    const isValid =
      (data.banco?.trim() || "") !== "" &&
      (data.agencia?.trim() || "") !== "" &&
      (data.conta?.trim() || "") !== "" &&
      (data.tipoConta?.trim() || "") !== "";

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
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-[100%]">
      {/* Banco */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Banco</label>
        <select
          value={data.banco || ""}
          onChange={(e) => handleInputChange("banco", e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Selecione --</option>
          {bancos.map((banco, index) => (
            <option key={index} value={banco}>
              {banco}
            </option>
          ))}
        </select>
      </div>
      {/* Agência */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Agência</label>
        <input
          type="text"
          value={data.agencia || ""}
          onChange={(e) => handleInputChange("agencia", e.target.value)}
          placeholder="Digite a agência"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Conta */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Conta</label>
        <input
          type="text"
          value={data.conta || ""}
          onChange={(e) => handleInputChange("conta", e.target.value)}
          placeholder="Digite a conta"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Tipo de Conta */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tipo de Conta</label>
        <select
          value={data.tipoConta || ""}
          onChange={(e) => handleInputChange("tipoConta", e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Selecione --</option>
          {tiposConta.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
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
