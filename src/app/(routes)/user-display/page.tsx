"use client";

import UserCreationForm from "@/app/components/display/user-form";
import "./style.css";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/components/navigation/navigation";
import { useState } from "react";
import { z } from "zod";
import { userInputSchema } from "@/app/schemas/userSchema"; // ✅ Importando o schema correto

// 🔹 Define o tipo baseado no `userInputSchema`
type UserInput = z.infer<typeof userInputSchema>;

export default function Contract() {
  const router = useRouter();

  // ✅ Estado inicial baseado no schema do Zod
  const [userData, setUserData] = useState<UserInput>(() =>
    userInputSchema.parse({ name: "", email: "", password: "" }) // ✅ Evita erro e garante objeto válido
  );

  // ✅ Função para salvar, validando antes com Zod
  const handleSave = async (): Promise<void> => {
    const result = userInputSchema.safeParse(userData);

    if (!result.success) {
      console.error("⚠ Erros de validação:", result.error.format());

      // 🔹 Extrai mensagens de erro para exibição
      const errorMessages = Object.values(result.error.format())
        .flat()
        .filter(Boolean)
        .join("\n");

      alert(`⚠ Erro nos dados:\n${errorMessages}`);
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
        mode="create" // ✅ Agora `mode` é aceito
        userData={userData}
        setUserData={setUserData}
        isEditable={true}
        onSave={handleSave} // ✅ Retorna `Promise<void>`
        onCancel={handleCancel}
      />

      {/* Botão "Voltar" */}
      <div
        className="absolute left-6 bottom-6 text-white p-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center bg-gray-700"
      >
        <button
          className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/user-display/user-list/")}
          aria-label="Voltar para a lista de usuários"
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
