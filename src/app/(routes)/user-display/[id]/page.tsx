"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "@/app/components/forms/user-form";
import { useUserContext } from "@/app/context/UserContext";
import { Navigation } from "@/app/components/navigation/navigation";

export default function UserDetailPage() {
  const { users, updateUser } = useUserContext();
  const [formData, setFormData] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const userId = Number(params.id); // Converte o ID para número

    if (isNaN(userId)) {
      alert("ID inválido! Redirecionando...");
      router.push("/user-display/user-list");
      return;
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      alert("Usuário não encontrado! Redirecionando...");
      router.push("/user-display/user-list");
    } else {
      setFormData(user);
    }
  }, [params.id, users, router]);

  const handleSave = (updatedData: any) => {
    if (!updatedData.id) {
      alert("Erro: ID do usuário não encontrado.");
      return;
    }

    updateUser(updatedData.id, updatedData); // Passa o ID e os dados atualizados
    alert("Usuário atualizado com sucesso!");
    router.push("/user-display/user-list");
  };

  const handleCancel = () => {
    router.push("/user-display/user-list");
  };

  if (!formData) {
    return (
      <p className="text-white text-center">Carregando os dados do usuário...</p>
    );
  }

  return (
    <div className="mx-auto mt-10"
    style={{
      background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))"
    }}
    >
      <Navigation/>
      <UserForm
        mode="edit"
        userData={formData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
