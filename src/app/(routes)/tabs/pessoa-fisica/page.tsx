"use client";

import { PessoaFisica } from "@/app/components/switch-tabs/pessoa-fisica";

export default function PessoaFisicaPage() {
  const handleNext = () => {
    console.log("Próxima aba acionada!");
  };

  const handlePrev = () => {
    console.log("Voltar acionado!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <PessoaFisica onNext={handleNext} onPrev={handlePrev} isEditable={false} />
    </div>
  );
}
