'use client'

import { EmployeeService } from '@/app/services/employeeService'
import { Employees } from '@/app/types/employee'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'

export default function EmployeesDisplay() {
  const [employees, setEmployees] = useState<Employees>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const lastEmployeeRef = useRef<HTMLTableRowElement | null>(null)
  const router = useRouter()

  // const fetchEmployees = async () => {
  //   setLoading(true)
  //   try {
  //     const employeeList = await EmployeeService.getAllEmployees()
  //     if (!Array.isArray(employeeList)) {
  //       throw new Error('Dados inválidos recebidos do servidor.')
  //     }
  //     setEmployees((prev) => [...prev, ...employeeList])
  //   } catch (error) {
  //     console.error('Erro ao carregar funcionários:', error)
  //     setError('Erro ao carregar funcionários.')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const toggleEmployeeStatus = async (employeeId: number, isActive: boolean) => {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(employeeId, {
        active: !isActive
      })

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employeeId ? updatedEmployee : emp))
      )
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      setError('Erro ao atualizar status do funcionário.')
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))'
      }}
    >
      <div className="w-full max-w-7xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-white">Funcionários</h1>
            <button
              onClick={() => router.push('/contract-display/')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105"
            >
              Adicionar Funcionário
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar funcionário..."
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {error && <div className="p-4 bg-red-500 text-white text-center">{error}</div>}

          {loading && (
            <div className="p-6 text-center text-gray-300">
              Carregando funcionários...
            </div>
          )}

          <div
            className="overflow-y-auto border-t border-gray-600"
            style={{ maxHeight: '400px' }}
          >
            <table className="w-full table-auto border-collapse border border-gray-700 text-gray-300 rounded-lg">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-2 border border-gray-700">#</th>
                  <th className="px-4 py-2 border border-gray-700">Nome</th>
                  <th className="px-4 py-2 border border-gray-700">Função</th>
                  <th className="px-4 py-2 border border-gray-700">Matrícula</th>
                  <th className="px-4 py-2 border border-gray-700">CPF</th>
                  <th className="px-4 py-2 border border-gray-700">Ativo</th>
                  <th className="px-4 py-2 border border-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className={`hover:bg-gray-700 transition duration-200 cursor-pointer ${
                        !employee.active ? 'bg-gray-700 text-gray-400' : ''
                      }`}
                      onClick={() => router.push(`/contract-display/${employee.id}`)}
                      ref={
                        index === filteredEmployees.length - 1 ? lastEmployeeRef : null
                      }
                    >
                      <td className="px-4 py-2 border border-gray-700">{index + 1}</td>
                      <td className="px-4 py-2 border border-gray-700">
                        {employee.name || 'Não informado'}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {employee.position?.name || 'Não informado'}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {employee.registration || 'Não informado'}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {employee?.taxId || 'Não informado'}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        {employee.active ? 'Ativo' : 'Inativo'}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            employee.id &&
                              toggleEmployeeStatus(employee.id, !!employee.active)
                          }}
                          className={`px-3 py-1 rounded ${
                            employee.active
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-green-500 hover:bg-green-600'
                          } text-white`}
                        >
                          {employee.active ? 'Desativar' : 'Ativar'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-2 text-center border border-gray-700"
                    >
                      Nenhum funcionário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
