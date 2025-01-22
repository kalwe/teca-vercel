"use client";

import { useUserContext } from "@/app/context/UserContext"; // Import the UserContext
import { useRouter } from "next/navigation";

function UserList() {
  const { users, updateUser, deleteUser } = useUserContext(); // Fetch users and context functions
  const router = useRouter();

  const handleEditUser = (userId: number) => {
    router.push(`/user-display/${userId}`); // Redirect to the user edit form
  };

  const toggleUserStatus = (userId: number, isActive: boolean) => {
    updateUser(userId, { active: !isActive }); // Toggle active/inactive status
  };

  const handleAddUser = () => {
    router.push("/user-display/"); // Redirect to add user form
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))" }}>
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-6 bg-gray-900 rounded-t-lg flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Usuários</h1>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Adicionar Usuário
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="px-4 py-3 border border-gray-600">#</th>
                <th className="px-4 py-3 border border-gray-600">Username</th>
                <th className="px-4 py-3 border border-gray-600">Email</th>
                <th className="px-4 py-3 border border-gray-600">Ativo</th>
                <th className="px-4 py-3 border border-gray-600">Ação</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-600 transition-all duration-200 ${!user.active ? "bg-gray-500 text-gray-400" : "text-white"}`}
                  >
                    <td className="px-4 py-3 border border-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 border border-gray-600">{user.username || "Não informado"}</td>
                    <td className="px-4 py-3 border border-gray-600">{user.email || "Não informado"}</td>
                    <td className="px-4 py-3 border border-gray-600">{user.active ? "Ativo" : "Inativo"}</td>
                    <td className="px-4 py-3 border border-gray-600 space-x-2">
                      <button
                        onClick={() => toggleUserStatus(user.id, user.active)}
                        className={`px-3 py-1 rounded-lg ${
                          user.active ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                      >
                        {user.active ? "Desativar" : "Ativar"}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
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
                  <td colSpan={5} className="px-4 py-3 text-center border border-gray-600 text-gray-400">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;
