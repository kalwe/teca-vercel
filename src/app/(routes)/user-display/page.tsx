"use client";

import UserCreationForm from "@/app/components/forms/user-form";
import "./style.css";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/components/navigation/navigation";
import { useState } from "react";


export default function Contract() {
  const router = useRouter();

  // Estado inicial para formData
  const [formData, setFormData] = useState<any>({
    pessoaFisica: {
      nome: "",
      cpf: "",
      genero: "",
      estadoCivil: "",
      rg: "",
      orgaoExpedidor: "",
      selectedDate: null,
    },
    funcionario: {},
    address: {},
    contact: {},
    bank: {},
    vestuario: {},
  });

  // Função para salvar (você pode adicionar lógica específica aqui)
  const handleSave = () => {
    console.log("Dados salvos:", formData);
    router.push("/dashboard-display/");
  };

  // Função para cancelar
  const handleCancel = () => {
    router.push("/dashboard-display/");
  };

  return (
    <div>
      <Navigation />

      <UserCreationForm
        formData={formData} // Passa o estado inicializado
        setFormData={setFormData} // Atualiza o estado
        isEditable={true} // Permitir edição
        onSave={handleSave} // Função de salvar
        onCancel={handleCancel} // Função de cancelar
        mode={"add"}      />

      {/* Botão "Voltar" */}
      <div
        style={{
          backgroundColor: "#D9D9D963",
          zIndex: 6,
        }}
        className="absolute right-[88%] bottom-[66%] text-white p-4 rounded-[21px] h-[12%] shadow-md transition-all duration-300 transform hover:scale-105  flex items-center justify-center"
      >
        {/* Ícone Circular */}
        <button
          className="w-[30px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/user-display/user-list/")}
        >
          {/* Ícone de seta para voltar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
