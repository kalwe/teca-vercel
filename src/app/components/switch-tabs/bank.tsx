"use client";

import { useEffect, useState } from "react";
import { BankProps } from "@/app/types/employee";
import { agencySchema } from "@/app/schemas/bank/agencySchema";
import { accountSchema } from "@/app/schemas/bank/accountSchema";

export function Bank({
  data = { banco: "", agencia: "", conta: "", tipoConta: "" }, // Valores padrão
  onChange,
  onNext,
  onPrev,
  mode,
}: BankProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errors, setErrors] = useState<{ agencia: string | null; conta: string | null }>({
    agencia: null,
    conta: null,
  });

  // Garante que `data` é sempre um objeto válido
  const safeData = {
    banco: data?.banco || "",
    agencia: data?.agencia || "",
    conta: data?.conta || "",
    tipoConta: data?.tipoConta || "",
  };

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
    "HSBC Bank Brasil",
    "Inter - INTERMEDIUM S.A.",
    "Itaú Unibanco",
    "MERCADO PAGO",
    "Nubank",
    "PAGBANK PAGSEGURO",
    "PICPAY SERVIÇOS S.A",
    "Sicoob",
    "Unicred",
  ];

  const tiposConta = ["Conta Corrente", "Conta Poupança", "Conta Salário"];

  // Validação
  useEffect(() => {
    const isValid =
      safeData.banco.trim() !== "" &&
      safeData.agencia.trim() !== "" &&
      safeData.conta.trim() !== "" &&
      safeData.tipoConta.trim() !== "" &&
      !errors.agencia &&
      !errors.conta;

    setIsNextEnabled(isValid);
  }, [safeData, errors]);

  const handleInputChange = (field: keyof typeof safeData, value: string) => {
    // Validação dinâmica para conta e agência
    if (field === "agencia") {
      try {
        agencySchema.parse(value);
        setErrors((prev) => ({ ...prev, agencia: null }));
      } catch (err: any) {
        setErrors((prev) => ({ ...prev, agencia: err.errors[0].message }));
      }
    }

    if (field === "conta") {
      try {
        accountSchema.parse({ tipo: safeData.tipoConta, numero: value });
        setErrors((prev) => ({ ...prev, conta: null }));
      } catch (err: any) {
        setErrors((prev) => ({ ...prev, conta: err.errors[0].message }));
      }
    }

    onChange({ ...safeData, [field]: value });
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-[100%]">
      {/* Banco */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Banco</label>
        <select
          value={safeData.banco}
          onChange={(e) => handleInputChange("banco", e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={mode === "view"}
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
          value={safeData.agencia}
          onChange={(e) => handleInputChange("agencia", e.target.value)}
          placeholder="Digite a agência"
          className={`w-full bg-gray-700 text-white placeholder-gray-400 border ${
            errors.agencia ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={mode === "view"}
        />
        {errors.agencia && <p className="text-red-500 text-sm mt-1">{errors.agencia}</p>}
      </div>

      {/* Conta */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Conta</label>
        <input
          type="text"
          value={safeData.conta}
          onChange={(e) => handleInputChange("conta", e.target.value)}
          placeholder="Digite a conta"
          className={`w-full bg-gray-700 text-white placeholder-gray-400 border ${
            errors.conta ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={mode === "view"}
        />
        {errors.conta && <p className="text-red-500 text-sm mt-1">{errors.conta}</p>}
      </div>

      {/* Tipo de Conta */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tipo de Conta</label>
        <select
          value={safeData.tipoConta}
          onChange={(e) => handleInputChange("tipoConta", e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={mode === "view"}
        >
          <option value="">-- Selecione --</option>
          {tiposConta.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
