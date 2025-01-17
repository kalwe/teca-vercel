import React, { useState } from "react";
import { cpfSchema } from "@/app/schemas/common/cpfSchema";
import { CpfMaskProps } from "@/app/types/employee";

export function CpfMask({ value, onChange }: CpfMaskProps) {
  const [error, setError] = useState<string | null>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cpfValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    // Aplica a máscara de CPF
    if (cpfValue.length > 3 && cpfValue.length <= 6) {
      cpfValue = cpfValue.slice(0, 3) + "." + cpfValue.slice(3);
    } else if (cpfValue.length > 6 && cpfValue.length <= 9) {
      cpfValue = cpfValue.slice(0, 3) + "." + cpfValue.slice(3, 6) + "." + cpfValue.slice(6);
    } else if (cpfValue.length > 9) {
      cpfValue =
        cpfValue.slice(0, 3) +
        "." +
        cpfValue.slice(3, 6) +
        "." +
        cpfValue.slice(6, 9) +
        "-" +
        cpfValue.slice(9, 11);
    }

    onChange(cpfValue); // Atualiza o valor mascarado

    // Validação com o zod
    try {
      cpfSchema.parse(cpfValue);
      setError(null); // Sem erro
    } catch (err: any) {
      setError(err.errors[0].message); // Exibe mensagem de erro
    }
  };

  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="CPF"
        className="w-full bg-transparent border-none outline-none text-white placeholder-white"
        value={value} // Valor vindo do componente pai
        onChange={handleCpfChange} // Atualiza o valor com a máscara e validação
        maxLength={14} // Limite de caracteres para o CPF formatado
      />
      <div className="border-t border-white w-full mt-1"></div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
