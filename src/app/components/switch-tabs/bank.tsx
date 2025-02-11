"use client";

import { useState, useEffect } from "react";
import { BankService } from "@/app/services/bankService";
import { bankAccountSchema } from "@/app/schemas/bankAccountSchema";
import type { BankProps, BankAccountType } from "@/app/types/bank_account";
import { z } from "zod";

export function Bank({ data = {}, onChange, onNext, onPrev, employeeId, mode }: BankProps) {
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BankAccountType, string>>>({});

  // Atualiza os dados e valida instantaneamente
  const handleInputChange = (field: keyof BankAccountType, value: string) => {
    const updatedData = { ...data, [field]: value };

    try {
    const validateBank = bankAccountSchema(updatedData);
      setErrors({});
      setIsSaveEnabled(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BankAccountType, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof BankAccountType] = e.message;
        });
        setErrors(newErrors);
      }
      setIsSaveEnabled(false);
    }

    onChange(updatedData);
  };

  // Busca os dados bancários caso ainda não tenham sido carregados
  useEffect(() => {
    if (employeeId && Object.keys(data).length === 0) {
      BankService.getBankAccountById(employeeId)
        .then((bankData) => onChange(bankData))
        .catch((error) => console.error("Erro ao buscar conta bancária:", error));
    }
  }, [employeeId, data, onChange]);

  // Salva os dados bancários e valida antes de enviar
  const handleSave = async () => {
    try {
      bankAccountSchema.parse(data); // Valida antes de salvar

      await BankService.createBankAccount({ ...data, employee: employeeId });
      alert("Conta bancária criada com sucesso!");

      if (typeof onNext === "function") {
        onNext();
      } else {
        console.error("onNext não foi passado corretamente para o componente Bank.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BankAccountType, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof BankAccountType] = e.message;
        });
        setErrors(newErrors);
      } else {
        alert("Erro ao criar conta bancária.");
        console.error(error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-full">
      <h2 className="text-white text-xl font-bold">Dados Bancários</h2>

      {/* Banco */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Banco</label>
        <select
          value={data.bank || ""}
          onChange={(e) => handleInputChange("bank", e.target.value)}
          className={`w-full bg-gray-700 text-white border ${errors.bank ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={mode === "view"}
        >
          <option value="">-- Selecione --</option>
          {[
            "Banco BMG", "Banco Bradesco", "Banco BRB", "Banco Citibank",
            "Banco Cooperativo Sicredi S.A.", "Banco da Amazônia", "Banco do Brasil",
            "BANCO DO NORDESTE DO BRASIL S.A.", "Banco ItaúBank", "BANCO ITI",
            "BANCO NEON", "BANCO PAN", "Banco Santander", "Banco Votorantim",
            "BANCO WILL", "C6 BANK", "Caixa Econômica Federal", "HSBC Bank Brasil",
            "Inter - INTERMEDIUM S.A.", "Itaú Unibanco", "MERCADO PAGO",
            "Nubank", "PAGBANK PAGSEGURO", "PICPAY SERVIÇOS S.A", "Sicoob", "Unicred",
          ].map((banco, index) => (
            <option key={index} value={banco}>{banco}</option>
          ))}
        </select>
        {errors.bank && <p className="text-red-500 text-sm mt-1">{errors.bank}</p>}
      </div>

      {/* Agência */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Agência</label>
        <input
          type="text"
          value={data.agency || ""}
          onChange={(e) => handleInputChange("agency", e.target.value)}
          placeholder="Digite a agência"
          className={`w-full bg-gray-700 text-white border ${errors.agency ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={mode === "view"}
        />
        {errors.agency && <p className="text-red-500 text-sm mt-1">{errors.agency}</p>}
      </div>

      {/* Conta */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Conta</label>
        <input
          type="text"
          value={data.account || ""}
          onChange={(e) => handleInputChange("account", e.target.value)}
          placeholder="Digite a conta"
          className={`w-full bg-gray-700 text-white border ${errors.account ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={mode === "view"}
        />
        {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
      </div>

      {/* Tipo de Conta */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tipo de Conta</label>
        <select
          value={data.account_type || ""}
          onChange={(e) => handleInputChange("account_type", e.target.value)}
          className={`w-full bg-gray-700 text-white border ${errors.account_type ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3`}
          disabled={mode === "view"}
        >
          <option value="">-- Selecione --</option>
          <option value="corrente">Conta Corrente</option>
          <option value="poupança">Conta Poupança</option>
          <option value="salário">Conta Salário</option>
        </select>
        {errors.account_type && <p className="text-red-500 text-sm mt-1">{errors.account_type}</p>}
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={!isSaveEnabled}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
