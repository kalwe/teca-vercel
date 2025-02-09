import React, { useState } from "react";
import { CepMaskProps } from "@/app/types/employee";
import { cepSchema } from "@/app/schemas/common/cepSchema";

export default function CepMask({ value, onChange, disabled }: CepMaskProps) {
  const [error, setError] = useState<string | null>(null);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cepValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    // Aplica a máscara do CEP
    if (cepValue.length > 5) {
      cepValue = cepValue.slice(0, 5) + "-" + cepValue.slice(5, 8);
    }

    onChange(cepValue); // Passa o valor mascarado para o componente pai

    // Valida o valor com o schema
    try {
      cepSchema.parse(cepValue);
      setError(null); // Sem erro
    } catch (err: any) {
      setError(err.errors[0].message); // Exibe mensagem de erro
    }
  };

  return (
    <div className="relative flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="CEP"
            className={`w-full bg-transparent border-none outline-none text-white placeholder-white ${
              error ? "border-red-500" : ""
            }`}
            value={value} // Usa o valor vindo da prop
            onChange={handleCepChange} // Atualiza o valor no componente pai
            maxLength={9} // Limita o número máximo de caracteres para o formato do CEP
            disabled={disabled} // Desabilita o campo, se necessário
          />
          <div className="border-t border-white w-full mt-1"></div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
