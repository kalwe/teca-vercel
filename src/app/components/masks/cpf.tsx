import React, { useState } from "react";
import { cpfSchema } from "@/app/schemas/common/cpfSchema";
import { CpfMaskProps } from "@/app/types/employee";

export function CpfMask({ value, onChange, disabled = false }: CpfMaskProps) {
  const [error, setError] = useState<string | null>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // Prevent editing when disabled

    let cpfValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Apply CPF mask
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

    onChange(cpfValue); // Update masked value

    // Validation with Zod
    try {
      cpfSchema.parse(cpfValue);
      setError(null);
    } catch (err: any) {
      setError(err.errors[0].message);
    }
  };

  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="CPF"
        className={`w-full bg-transparent border-none outline-none text-white placeholder-white ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={value}
        onChange={handleCpfChange}
        maxLength={14}
        disabled={disabled} // Apply disabled attribute
      />
      <div className="border-t border-white w-full mt-1"></div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
