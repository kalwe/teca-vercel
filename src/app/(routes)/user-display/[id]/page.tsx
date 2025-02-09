"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "@/app/components/display/user-form";
import { useUserContext } from "@/app/context/UserContext";
import { userInputSchema } from "@/app/schemas/userSchema"; // ✅ Agora usa apenas `UserInput`
import { Navigation } from "@/app/components/navigation/navigation";
import { z } from "zod";

// 🔹 Define o tipo correto baseado no `userInputSchema`
type UserInput = z.infer<typeof userInputSchema>;

export default function UserDetailPage() {
  const { updateUser } = useUserContext();
  const [formData, setFormData] = useState<UserInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const userId = Number(params.id);

    if (isNaN(userId)) {
      alert("❌ ID inválido! Redirecionando...");
      router.replace("/user-display/user-list");
      return;
    }

    // 🔹 Criar um usuário vazio para cadastro
    const newUser: UserInput = {
      name: "",
      email: "",
      password: "",
      id: 0
    };

    setFormData(newUser);
    setLoading(false);
  }, [params.id, router]);

  const handleSave = async (updatedData: UserInput) => {
    setLoading(true);
    try {
      // 🔹 Valida os dados antes de enviar
      const userInputData = userInputSchema.parse(updatedData);

      await updateUser(Number(params.id), userInputData);

      alert("✅ Usuário cadastrado com sucesso!");
      router.push("/user-display/user-list");
    } catch (error) {
      console.error("❌ Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário! Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/user-display/user-list");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-white text-lg font-semibold">
          🔄 Carregando os dados do usuário...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      {formData ? (
        <UserForm
          mode="create"
          userData={formData} // ✅ `userData` agora é apenas `UserInput`
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
          setUserData={setFormData} // ✅ Agora corretamente tipado
          isEditable={true}
        />
      ) : (
        <p className="text-center text-red-500 text-lg">⚠ Erro ao carregar formulário de cadastro.</p>
      )}
    </div>
  );
}
