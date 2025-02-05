"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "@/app/components/display/user-form";
import { useUserContext } from "@/app/context/UserContext";
import { UserService } from "@/app/services/userService";
import { UserOutput, UserInput } from "@/app/types/user";
import { Navigation } from "@/app/components/navigation/navigation";

export default function UserDetailPage() {
  const { users, updateUser } = useUserContext();
  const [formData, setFormData] = useState<UserOutput | null>(null);
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

    const fetchUser = async () => {
      try {
        setLoading(true);
        let user = users.find((u) => u.id === userId) || await UserService.getUserById(userId);

        if (user) {
          setFormData(user);
        } else {
          alert("⚠ Usuário não encontrado! Redirecionando...");
          router.replace("/user-display/user-list");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("❌ Erro ao carregar usuário! Tente novamente.");
        router.replace("/user-display/user-list");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id, users, router]);

  const handleSave = async (updatedData: Partial<UserInput>) => {
    if (!formData) return;

    setLoading(true);
    try {
      // ✅ Convertendo `UserOutput` para `UserInput`
      const userInputData: UserInput = {
        name: updatedData.name ?? formData.name,
        email: updatedData.email ?? formData.email,
        password: updatedData.password ?? "",
      };

      const updatedUser = await UserService.updateUser(formData.id, userInputData);
      updateUser(formData.id, updatedUser);

      alert("✅ Usuário atualizado com sucesso!");
      router.push("/user-display/user-list");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("❌ Erro ao atualizar usuário! Tente novamente.");
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
          mode="edit"
          userData={formData} // ✅ `userData` corretamente tipado como `UserOutput`
          onSave={handleSave} // ✅ `onSave` aceita `Partial<UserInput>`
          onCancel={handleCancel}
          loading={loading} setUserData={function (value: SetStateAction<UserInput>): void {
            throw new Error("Function not implemented.");
          } } isEditable={false}        />
      ) : (
        <p className="text-center text-red-500 text-lg">⚠ Erro ao carregar usuário.</p>
      )}
    </div>
  );
}
