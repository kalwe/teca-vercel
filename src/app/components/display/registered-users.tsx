"use client";

import { useUserContext } from "@/app/context/UserContext"; // Contexto de usuários
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userOutputSchema, UserService } from "@/app/schemas/userSchema"; // 🔹 Agora usa os schemas corretos
import { z } from "zod";

// 🔹 Define o tipo do usuário baseado no `userOutputSchema`
type UserOutput = z.infer<typeof userOutputSchema>;

function UserList() {
  const { updateUser } = useUserContext(); // Obtém função do contexto para atualizar usuários
  const router = useRouter();
  const [userList, setUserList] = useState<UserOutput[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Carregar usuários do backend ao montar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromAPI = await UserService.getUsers();
        const validatedUsers = userOutputSchema.array().parse(usersFromAPI);
        setUserList(validatedUsers);
      } catch (err) {
        console.error("⚠ Erro ao buscar usuários do backend:", err);
        setError("Erro ao carregar usuários. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Redirecionar para editar usuário
  const handleEditUser = (userId: number) => {
    router.push(`/user-display/${userId}`);
  };

  // 🔹 Ativar/desativar usuário via API
  const toggleUserStatus = async (userId: number, isActive: boolean) => {
    try {
      await updateUser(userId, { active: !isActive });
      setUserList((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, active: !isActive } : user
        )
      );
    } catch (err) {
      console.error("⚠ Erro ao alterar status do usuário:", err);
      setError("Erro ao atualizar status do usuário.");
    }
  };

  // 🔹 Excluir usuário via API
  const handleDeleteUser = async (userId: number) => {
    try {
      if (confirm("Tem certeza que deseja excluir este usuário?")) {
        await UserService.deleteUser(userId);
        setUserList((prev) => prev.filter((user) => user.id !== userId));
      }
    } catch (err) {
      console.error("⚠ Erro ao deletar usuário:", err);
      setError("Erro ao excluir usuário.");
    }
  };

  // 🔹 Redirecionar para adicionar novo usuário
  const handleAddUser = () => {
    router.push("/user-display/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))" }}
    >
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg">
        {/* Cabeçalho */}
        <div className="p-6 bg-gray-900 rounded-t-lg flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Usuários</h1>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Adicionar Usuário
          </button>
        </div>

        {/* Exibição de erros */}
        {error && <div className="p-4 bg-red-500 text-white text-center">{error}</div>}

        {/* Loader */}
        {loading ? (
          <div className="p-6 text-center text-gray-300">Carregando usuários...</div>
        ) : (
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="px-4 py-3 border border-gray-600">#</th>
                  <th className="px-4 py-3 border border-gray-600">Nome</th>
                  <th className="px-4 py-3 border border-gray-600">Email</th>
                  <th className="px-4 py-3 border border-gray-600">Ativo</th>
                  <th className="px-4 py-3 border border-gray-600">Ação</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 ? (
                  userList.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`hover:bg-gray-600 transition-all duration-200 ${
                        !user.active ? "bg-gray-500 text-gray-400" : "text-white"
                      }`}
                    >
                      <td className="px-4 py-3 border border-gray-600">{index + 1}</td>
                      <td className="px-4 py-3 border border-gray-600">
                        {user.name || "Não informado"}
                      </td>
                      <td className="px-4 py-3 border border-gray-600">
                        {user.email || "Não informado"}
                      </td>
                      <td className="px-4 py-3 border border-gray-600">
                        {user.active ? "Ativo" : "Inativo"}
                      </td>
                      <td className="px-4 py-3 border border-gray-600 space-x-2">
                        <button
                          onClick={() => toggleUserStatus(user.id, user.active)}
                          className={`px-3 py-1 rounded-lg ${
                            user.active
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white`}
                        >
                          {user.active ? "Desativar" : "Ativar"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                        >
                          Excluir
                        </button>
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-center border border-gray-600 text-gray-400"
                    >
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
