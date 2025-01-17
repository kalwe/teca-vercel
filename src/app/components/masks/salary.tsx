import React, { useState, useEffect } from "react";
import { MoneyInputProps } from "@/app/types/employee";


const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState<string>(value);

  useEffect(() => {
    // Synchronize local value with the parent value when it changes
    setLocalValue(value);
  }, [value]);

  const formatCurrency = (inputValue: string): string => {
    const numericValue = inputValue.replace(/\D/g, ""); // Keep only numeric characters
    const numberValue = parseFloat(numericValue) / 100; // Convert to a decimal
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue); // Format as currency
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    const formattedValue = formatCurrency(inputValue);
    setLocalValue(formattedValue); // Update local state for immediate feedback
    onChange(formattedValue); // Propagate the change to the parent
  };

  return (
    <div>
      <div className="w-full">
        <input
          type="text"
          placeholder="Salário"
          className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
          onChange={handleChange}
          value={localValue} // Controlled by local state
        />
        <div className="border-t border-white w-full mt-1"></div>
      </div>
    </div>
  );
};

export default MoneyInput;
