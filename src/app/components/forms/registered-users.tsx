'use client';

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
    <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
      <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
        <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px]"></div>
        <div
          style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }}
          className="bg-[#7A7A7A] w-[87%] h-[80%] rounded-[18px]"
        >
          <div className="max-w-[90%] mx-auto py-10 flex flex-col gap-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-extrabold text-white">Usuários</h1>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                Adicionar Usuário
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-700 text-gray-300 rounded-lg">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 border border-gray-700">#</th>
                    <th className="px-4 py-2 border border-gray-700">Username</th>
                    <th className="px-4 py-2 border border-gray-700">Email</th>
                    <th className="px-4 py-2 border border-gray-700">Ativo</th>
                    <th className="px-4 py-2 border border-gray-700">Ação</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`hover:bg-gray-600 transition-all duration-200 ${
                          !user.active ? "bg-gray-500 text-gray-400" : ""
                        }`}
                      >
                        <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-600">
                          {user.username || "Não informado"}
                        </td>
                        <td className="px-4 py-2 border border-gray-600">
                          {user.email || "Não informado"}
                        </td>
                        <td className="px-4 py-2 border border-gray-600">
                          {user.active ? "Ativo" : "Inativo"}
                        </td>
                        <td className="px-4 py-2 border border-gray-600 flex space-x-2">
                          <button
                            onClick={() => toggleUserStatus(user.id, user.active)}
                            className={`px-3 py-1 rounded ${
                              user.active
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            } text-white`}
                          >
                            {user.active ? "Desativar" : "Ativar"}
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                          >
                            Excluir
                          </button>
                          <button
                            onClick={() => handleEditUser(user.id)}
                            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-2 text-center border border-gray-600">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
