"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import UserForm from "@/app/components/display/user-form";
import { useUserContext } from "@/app/context/UserContext";
import { userInputSchema } from "@/app/schemas/userSchema";
import { Navigation } from "@/app/components/navigation/navigation";
import { z } from "zod";

// Define o tipo baseado no `userInputSchema`
type UserInput = z.infer<typeof userInputSchema>;

// Definição do endpoint da API (ajuste conforme necessário)
const API_URL = "https://api.example.com/users";

export default function UserDetailPage() {
  const { updateUser } = useUserContext();
  const [formData, setFormData] = useState<UserInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const userId = Number(params.id);

    if (isNaN(userId)) {
      alert("ID inválido. Redirecionando...");
      router.replace("/user-display/user-list");
      return;
    }

    // Criar um usuário vazio para edição/cadastro
    const newUser: UserInput = {
      id: userId,
      name: "",
      email: "",
      password: "",
    };

    setFormData(newUser);
    setLoading(false);
  }, [params.id, router]);

  const handleSave = async (updatedData: UserInput) => {
    setLoading(true);
    try {
      // Validação dos dados antes de enviar
      const userInputData = userInputSchema.parse(updatedData);

      // Atualiza usuário via API
      const response = await axios.patch(`${API_URL}/${updatedData.id}`, userInputData);

      // Atualiza o contexto com os novos dados
      updateUser(updatedData.id, response.data);

      alert("Usuário atualizado com sucesso.");
      router.push("/user-display/user-list");
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erro ao atualizar usuário. Tente novamente.");
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
          Carregando os dados do usuário...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      {formData ? (
        <UserForm
          mode="edit"
          userData={formData}
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
          setUserData={setFormData}
          isEditable={true}
        />
      ) : (
        <p className="text-center text-red-500 text-lg">Erro ao carregar formulário de cadastro.</p>
      )}
    </div>
  );
}
