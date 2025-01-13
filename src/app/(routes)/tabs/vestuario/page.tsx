"use client";

import { Vestuario } from "@/app/components/switch-tabs/vestuario";
import { PessoaFisica } from "@/app/components/switch-tabs/pessoa-fisica";

export default function VestuarioPage() {
  const handleNext = () => {
    console.log("Próxima aba acionada!");
  };

  const handlePrev = () => {
    console.log("Voltar acionado!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Vestuario data={{
              tamanhoCamisa: "",
              tamanhoCalca: "",
              tamanhoCalcado: "",
              nome: undefined,
              funcao: undefined,
              matricula: undefined,
              cpf: undefined
          }} onChange={function (updatedData: { tamanhoCamisa: string; tamanhoCalca: string; tamanhoCalcado: string; nome?: string; funcao?: string; matricula?: string; cpf?: string; }): void {
              throw new Error("Function not implemented.");
          } }  />
    </div>
  );
}
