import React, { useState, useEffect } from "react";
import { MoneyInputProps } from "@/app/types/employee";

const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState<string>("");

  useEffect(() => {
    setLocalValue(formatCurrency(value)); // Mantém sincronização entre form e input
  }, [value]);

  const formatCurrency = (inputValue: string): string => {
    const numericValue = inputValue.replace(/\D/g, ""); // Remove tudo que não for número
    const numberValue = parseFloat(numericValue) / 100; // Converte para decimal
    if (isNaN(numberValue)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const rawValue = event.target.value;
    const formattedValue = formatCurrency(rawValue);
    setLocalValue(formattedValue); // Atualiza exibição formatada
    onChange(formattedValue); // Passa a string formatada para o formulário
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Salário"
        className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
        onChange={handleChange}
        value={localValue}
      />
      <div className="border-t border-white w-full mt-1"></div>
    </div>
  );
};

export default MoneyInput;
