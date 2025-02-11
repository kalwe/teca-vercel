"use client";

import ContractForm from "@/app/components/display/contract-form";
import "./style.css";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/components/navigation/navigation";

export default function Contract() {
  const router = useRouter();

  /**
   * Função assíncrona para salvar os dados do contrato
   */
  const handleSave = async () => {
    try {
      console.log("Salvando contrato...");

      // Aqui você pode integrar com seu serviço de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Contrato salvo com sucesso!");
      router.push("/dashboard-display/");
    } catch (error) {
      console.error("⚠ Erro ao salvar contrato:", error);
      alert("Erro ao salvar o contrato.");
    }
  };

  /**
   * Função para cancelar e redirecionar
   */
  const handleCancel = () => {
    console.log("Cancelando...");
    router.push("/dashboard-display/");
  };

  return (
    <div>
      <Navigation />

      {/* Renderiza o formulário com as propriedades obrigatórias */}
      <ContractForm
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
        isEditable={true}
      />

      {/* Botão "Voltar" */}
      <div
        style={{
          backgroundColor: "#D9D9D963",
          zIndex: 6,
        }}
        className="absolute right-[88%] bottom-[66%] text-white p-4 rounded-[21px] h-[12%] shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        <button
          className="w-[30px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/contract-display/employee/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
