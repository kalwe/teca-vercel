'use client'

import { UserInput, Users } from '@/app/schemas/userSchema'
import { UserService } from '@/app/services/userService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function UserList() {
  const router = useRouter()
  const [userList, setUserList] = useState<Users>([])
  const [error, setError] = useState<string | null>(null)
  const [_loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const users = await UserService.getUsers()
        setUserList(users)
      } catch (err) {
        console.error('Erro ao buscar usuários:', err)
        setError('Erro ao carregar usuários. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }
    if (userList.length > 0) {
      fetchUsers()
    }
  }, [setUserList, setLoading, setError])

  const handleEditUser = (id: number) => {
    router.push(`/user-display/${id}`)
  }

  const toggleUserStatus = async (userId: number, user: UserInput) => {
    try {
      await UserService.updateUser(userId, { active: !user.active })
      setUserList(userList.filter((u) => u.id !== userId))
    } catch (err) {
      console.error('Erro ao alterar status do usuário:', err)
      setError('Erro ao atualizar status do usuário.')
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      if (confirm('Tem certeza que deseja excluir este usuário?')) {
        await UserService.deleteUser(userId)
        setUserList(userList.filter((user) => user.id !== userId))
      }
    } catch (err) {
      console.error('Erro ao deletar usuário:', err)
      setError('Erro ao excluir usuário.')
    }
  }

  const handleAddUser = () => {
    router.push('/user-display/')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))'
      }}
    >
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 bg-gray-900 rounded-t-lg flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Usuários</h1>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Adicionar Usuário
          </button>
        </div>

        {error && <div className="p-4 bg-red-500 text-white text-center">{error}</div>}

        <div
          className="overflow-y-auto p-6 border-t border-gray-600"
          style={{ maxHeight: '400px' }}
        >
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
                      !user.active ? 'bg-gray-500 text-gray-400' : 'text-white'
                    }`}
                  >
                    <td className="px-4 py-3 border border-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 border border-gray-600">
                      {user.name || 'Não informado'}
                    </td>
                    <td className="px-4 py-3 border border-gray-600">
                      {user.email || 'Não informado'}
                    </td>
                    <td className="px-4 py-3 border border-gray-600">
                      {user.active ? 'Ativo' : 'Inativo'}
                    </td>
                    <td className="px-4 py-3 border border-gray-600 space-x-2">
                      <button
                        onClick={() => toggleUserStatus(Number(user.id), user)}
                        className={`px-3 py-1 rounded-lg ${
                          user.active
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        {user.active ? 'Desativar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(Number(user.id))}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        Excluir
                      </button>
                      <button
                        onClick={() => handleEditUser(Number(user.id))}
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
      </div>
    </div>
  )
}

export default UserList
