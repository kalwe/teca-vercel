"use client";

import { useState} from "react";
import { BankService } from "@/app/services/bankService";
import { bankAccountSchema } from "@/app/schemas/bankAccountSchema";
import type { BankProps, BankAccountType } from "@/app/types/bank_account";
import { z } from "zod";

export function Bank({ data = {}, onChange, onNext, onPrev, employeeId, mode }: BankProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BankAccountType, string>>>({});

  const handleInputChange = (field: keyof BankAccountType, value: string) => {
    const updatedData = { ...data, [field]: value };

    try {
      bankAccountSchema.parse(updatedData); // Valida os dados
      setErrors({});
      setIsNextEnabled(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BankAccountType, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof BankAccountType] = e.message;
        });
        setErrors(newErrors);
        setIsNextEnabled(false);
      }
    }

    onChange(updatedData);
  };

  const handleSave = async () => {
    try {
      bankAccountSchema.parse(data); // Valida antes de salvar
      await BankService.createBankAccount({ ...data, employee: employeeId });
      alert("Conta bancária criada com sucesso!");
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BankAccountType, string>> = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0] as keyof BankAccountType] = e.message;
        });
        setErrors(newErrors);
      } else {
        alert("Erro ao cadastrar dados bancários.");
        console.error(error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-6 w-full">
      <h2 className="text-white text-xl font-bold">Dados Bancários</h2>

      {[
        { name: "bank", type: "select", label: "Banco", options: [
          "Banco BMG", "Banco Bradesco", "Banco BRB", "Banco Citibank",
          "Banco Cooperativo Sicredi S.A.", "Banco da Amazônia", "Banco do Brasil",
          "BANCO DO NORDESTE DO BRASIL S.A.", "Banco ItaúBank", "BANCO ITI",
          "BANCO NEON", "BANCO PAN", "Banco Santander", "Banco Votorantim",
          "BANCO WILL", "C6 BANK", "Caixa Econômica Federal", "HSBC Bank Brasil",
          "Inter - INTERMEDIUM S.A.", "Itaú Unibanco", "MERCADO PAGO",
          "Nubank", "PAGBANK PAGSEGURO", "PICPAY SERVIÇOS S.A", "Sicoob", "Unicred",
        ] },
        { name: "agency", type: "text", placeholder: "Digite a agência", label: "Agência" },
        { name: "account", type: "text", placeholder: "Digite a conta", label: "Conta" },
        { name: "account_type", type: "select", label: "Tipo de Conta", options: [
          { value: "corrente", label: "Conta Corrente" },
          { value: "poupança", label: "Conta Poupança" },
          { value: "salário", label: "Conta Salário" },
        ] },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <label className="block text-gray-400 mb-2">{field.label}</label>

          {field.type === "select" ? (
            <select
              name={field.name}
              value={data[field.name] || ""}
              onChange={(e) => handleInputChange(field.name as keyof BankAccountType, e.target.value)}
              className={`w-full bg-gray-700 text-white border ${
                errors[field.name] ? "border-red-500" : "border-gray-600"
              } rounded-lg py-2 px-3`}
              disabled={mode === "view"}
            >
              <option value="">-- Selecione --</option>
              {field.options.map((option, index) => (
                <option key={index} value={typeof option === "string" ? option : option.value}>
                  {typeof option === "string" ? option : option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={data[field.name] || ""}
              onChange={(e) => handleInputChange(field.name as keyof BankAccountType, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full bg-gray-700 text-white border ${
                errors[field.name] ? "border-red-500" : "border-gray-600"
              } rounded-lg py-2 px-3`}
              disabled={mode === "view"}
            />
          )}

          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Voltar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={!isNextEnabled}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
