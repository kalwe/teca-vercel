'use client';

import { useEmployeeContext } from "@/app/context/EmployeeContext"; // Contexto de funcionários
import { useRouter } from "next/navigation";
import { useState } from "react";

function Employees() {
  const { employees, updateEmployee } = useEmployeeContext(); // Obtém e atualiza os funcionários do contexto
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const handleEdit = (employeeId: number) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    if (employee) {
      router.push(
        `/employees/edit/${employeeId}?data=${encodeURIComponent(JSON.stringify(employee))}`
      );
    } else {
      alert("Funcionário não encontrado!");
    }
  };


  const handleDetail = (employeeId: number) => {
    router.push(`/employees/detail/${employeeId}`); // Redireciona para visualização
  };

  const handleDeactivate = (employeeId: number) => {
    updateEmployee(employeeId, { active: false }); // Atualiza status do funcionário
  };

  const toggleDropdown = (employeeId: number) => {
    setDropdownVisible((prev) => (prev === employeeId ? null : employeeId));
  };

  const changePage = () => {
    router.push('/contract-display/'); // Redireciona para adicionar funcionário
  };

  return (
    <div>
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
        <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
          <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px]"></div>
          <div
            style={{ zIndex: 10, position: 'absolute', top: '10%', left: '8%' }}
            className="bg-[#7A7A7A] w-[87%] h-[80%] rounded-[18px]"
          >
            <div className="max-w-[90%] mx-auto py-10 flex flex-col gap-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-white">
                  Funcionários
                </h1>
                <button
                  onClick={changePage}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                  Adicionar Funcionário
                </button>
              </div>

              {/* Tabela */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-700 text-gray-300 rounded-lg">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border border-gray-700">#</th>
                      <th className="px-4 py-2 border border-gray-700">Nome</th>
                      <th className="px-4 py-2 border border-gray-700">Função</th>
                      <th className="px-4 py-2 border border-gray-700">Matrícula</th>
                      <th className="px-4 py-2 border border-gray-700">CPF</th>
                      <th className="px-4 py-2 border border-gray-700">Encarregado</th>
                      <th className="px-4 py-2 border border-gray-700">Gerente</th>
                      <th className="px-4 py-2 border border-gray-700">Ativo</th>
                      <th className="px-4 py-2 border border-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700">
                    {employees.length > 0 ? (
                      employees.map((employee, index) => (
                        <tr
                          key={employee.id}
                          className="hover:bg-gray-600 transition-all duration-200"
                        >
                          <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.name}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.role}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.registration}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.cpf}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.supervisor ? 'Sim' : 'Não'}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.manager ? 'Sim' : 'Não'}</td>
                          <td className="px-4 py-2 border border-gray-600">
                            <span
                              className={`px-2 py-1 rounded text-white ${
                                employee.active ? 'bg-green-500' : 'bg-gray-500'
                              }`}
                            >
                              {employee.active ? 'Sim' : 'Desativado'}
                            </span>
                          </td>
                          <td className="px-4 py-2 border border-gray-600 relative">
                            <button
                              onClick={() => toggleDropdown(employee.id)}
                              className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500"
                            >
                              Ações
                            </button>
                            {dropdownVisible === employee.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
                                <ul className="text-white">
                                  <li
                                    onClick={() => handleEdit(employee.id)}
                                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                  >
                                    Editar
                                  </li>
                                  <li
                                    onClick={() => handleDetail(employee.id)}
                                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                  >
                                    Detalhar
                                  </li>
                                  <li
                                    onClick={() => handleDeactivate(employee.id)}
                                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                  >
                                    Desativar
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="px-4 py-2 text-center border border-gray-600">
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
      </div>
    </div>
  );
}

export default Employees;
