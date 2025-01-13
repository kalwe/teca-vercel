import React, { useState } from "react";

const MoneyInput: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const formatCurrency = (inputValue: string): string => {
    const numericValue = inputValue.replace(/\D/g, "");
    const numberValue = parseFloat(numericValue) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    setValue(formatCurrency(inputValue));
  };

  return (
    <div>
     <div className="w-full">
                <input
                  type="text"
                  placeholder="Salário"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
                  onChange={handleChange}
                  value={value}
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
    </div>
  );
};

export default MoneyInput;
