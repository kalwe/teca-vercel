"use client";

import ContractForm from "@/app/components/display/contract-form";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/components/navigation/navigation";
import { ArrowLeftCircle } from "lucide-react"; // Ícone atualizado
import ComebackButton from "@/app/components/button/comeback";

export default function Contract() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-[#0B140B] to-[#4F7452] min-h-screen relative">
      <Navigation />

      {/* Renderiza o formulário */}
      <ContractForm isEditable={true} />
<ComebackButton/>
    </div>
  );
}
