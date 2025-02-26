"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserForm from "@/app/components/display/user-form";
import { Navigation } from "@/app/components/navigation/navigation";
import { UserService } from "@/app/services/userService";

export default function UserDetailPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const userData = await UserService.getUserById(id);
          setUserData(userData);
        } catch (error) {
          console.error("Erro ao carregar usuário:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-white text-lg font-semibold">
          Carregando usuário...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      {userData && (
        <UserForm
          mode="edit"
          isEditable={true}
          userData={userData}
        />
      )}
    </div>
  );
}
