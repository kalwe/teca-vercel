'use client';

import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmployeeTable() {
  const { employees, updateEmployee } = useEmployeeContext();
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const handleEdit = (employeeId: number) => {
    router.push(`/employees/edit/${employeeId}`);
  };

  const handleDetail = (employeeId: number) => {
    router.push(`/employees/detail/${employeeId}`);
  };

  const handleDeactivate = (employeeId: number) => {
    updateEmployee(employeeId, { active: false });
  };

  const toggleDropdown = (employeeId: number) => {
    setDropdownVisible((prev) => (prev === employeeId ? null : employeeId));
  };

  return (
    <div className="text-white w-full h-full bg-gray-900 rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">Funcionários</h1>
      <table className="table-auto w-full border-collapse border border-gray-700">
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
              <tr key={employee.id}>
                <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-600">{employee.name}</td>
                <td className="px-4 py-2 border border-gray-600">{employee.role}</td>
                <td className="px-4 py-2 border border-gray-600">{employee.registration}</td>
                <td className="px-4 py-2 border border-gray-600">{employee.cpf}</td>
                <td className="px-4 py-2 border border-gray-600">
                  {employee.supervisor ? 'Sim' : 'Não'}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {employee.manager ? 'Sim' : 'Não'}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      employee.active ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {employee.active ? 'Ativo' : 'Desativado'}
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
                          Visualizar
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
              <td
                colSpan={9}
                className="px-4 py-2 text-center border border-gray-600"
              >
                Nenhum funcionário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
