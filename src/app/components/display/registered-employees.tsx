"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "@/app/types/employee";
import { EmployeeService } from "@/app/services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // ✅ Carrega funcionários do backend ao montar o componente
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeList = await EmployeeService.getAllEmployees();
        setEmployees(employeeList);
      } catch (error) {
        console.error("⚠ Erro ao carregar funcionários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // ✅ Redireciona para exibir contrato do funcionário
  const handleRowClick = (employeeId: number) => {
    router.push(`/contract-display/${employeeId}`);
  };

  // ✅ Redireciona para cadastrar novo funcionário
  const handleAddEmployee = () => {
    router.push("/contract-display/");
  };

  // ✅ Atualiza status do funcionário
  const toggleEmployeeStatus = async (employeeId: number, isActive: boolean) => {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(employeeId, {
        active: !isActive,
      });

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employeeId ? updatedEmployee : emp))
      );
    } catch (error) {
      console.error("⚠ Erro ao atualizar status:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))",
      }}
    >
      <div className="w-full max-w-7xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-white">Funcionários</h1>
            <button
              onClick={handleAddEmployee}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              Adicionar Funcionário
            </button>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="p-6 text-center text-gray-300">Carregando funcionários...</div>
          ) : (
            <div className="overflow-x-auto">
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
                  {employees.length > 0 ? (
                    employees.map((employee, index) => (
                      <tr
                        key={employee.id}
                        className={`hover:bg-gray-700 transition duration-200 cursor-pointer ${
                          !employee.active ? "bg-gray-700 text-gray-400" : ""
                        }`}
                        onClick={() => handleRowClick(employee.id)}
                      >
                        <td className="px-4 py-2 border border-gray-700">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-700">
                          {employee.name || "Não informado"}
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          {employee.function?.name || "Não informado"}
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          {employee.registration || "Não informado"}
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          {employee.person?.tax_id || "Não informado"}
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          {employee.active ? "Ativo" : "Inativo"}
                        </td>
                        <td className="px-4 py-2 border border-gray-700 flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleEmployeeStatus(employee.id, employee.active);
                            }}
                            className={`px-3 py-1 rounded ${
                              employee.active
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            } text-white`}
                          >
                            {employee.active ? "Desativar" : "Ativar"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-2 text-center border border-gray-700">
                        Nenhum funcionário encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employees;
