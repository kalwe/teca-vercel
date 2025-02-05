"use client";

import UserCreationForm from "@/app/components/display/user-form";
import "./style.css";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/components/navigation/navigation";
import { useState } from "react";
import { z } from "zod";
import { userInputSchema } from "@/app/schemas/userSchema"; // ✅ Importando o schema correto

export default function Contract() {
  const router = useRouter();

  // ✅ Estado inicial baseado no schema do Zod
  const [userData, setUserData] = useState<z.infer<typeof userInputSchema>>(
    () => userInputSchema.parse({}) // ✅ Melhor prática para evitar reexecução do parse
  );

  // ✅ Função para salvar, validando antes com Zod
  const handleSave = async (): Promise<void> => {
    const result = userInputSchema.safeParse(userData);

    if (!result.success) {
      console.error("⚠ Erros de validação:", result.error.format());
      alert("⚠ Erro nos dados: " + JSON.stringify(result.error.format(), null, 2));
      return;
    }

    try {
      console.log("✅ Usuário validado e salvo:", result.data);
      alert("✅ Usuário criado com sucesso!");
      router.push("/dashboard-display/");
    } catch (error) {
      console.error("❌ Erro ao salvar usuário:", error);
      alert("❌ Ocorreu um erro ao salvar. Tente novamente.");
    }
  };

  // ✅ Função para cancelar
  const handleCancel = () => {
    router.push("/dashboard-display/");
  };

  return (
    <div>
      <Navigation />

      <UserCreationForm
        mode="create" // ✅ Alterado de "add" para "create"
        userData={userData}
        setUserData={setUserData}
        isEditable={true}
        onSave={handleSave} // ✅ Agora retorna `Promise<void>`
        onCancel={handleCancel}
      />

      {/* Botão "Voltar" */}
      <div
        style={{
          backgroundColor: "#D9D9D963",
          zIndex: 6,
        }}
        className="absolute right-[88%] bottom-[66%] text-white p-4 rounded-[21px] h-[12%] shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
