"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "@/app/components/display/user-form";
import { useUserContext } from "@/app/context/UserContext";
import { UserService } from "@/app/schemas/userSchema";
import { userInputSchema } from "@/app/schemas/userSchema";
import { Navigation } from "@/app/components/navigation/navigation";
import { z } from "zod";

// Define o tipo baseado no `userInputSchema`
type UserInput = z.infer<typeof userInputSchema>;

export default function UserDetailPage() {
  const { updateUser } = useUserContext();
  const [formData, setFormData] = useState<UserInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = useParams(); // Captura ID da URL

  useEffect(() => {
    const userId = Number(id);

    if (isNaN(userId)) {
      alert("ID inválido. Redirecionando...");
      router.replace("/user-display/user-list");
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await UserService.getUserById(userId);
        setFormData(user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Usuário não encontrado. Criando um novo...");
        setFormData({ id: userId, name: "", email: "", password: "" }); // Novo usuário
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, router]);

  const handleSave = async (updatedData: UserInput) => {
    setLoading(true);
    try {
      // Validação dos dados antes de enviar
      const userInputData = userInputSchema.parse(updatedData);

      // Atualiza usuário via API
      const updatedUser = await UserService.updateUser(updatedData.id, userInputData);

      // Atualiza o contexto com os novos dados
      updateUser(updatedData.id, updatedUser);

      alert("Usuário atualizado com sucesso.");
      router.push("/user-display/user-list");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário. Tente novamente.");
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
      {formData && (
        <UserForm
          mode="edit"
          userData={formData}
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
          setUserData={setFormData}
          isEditable={true}
        />
      )}
    </div>
  );
}
