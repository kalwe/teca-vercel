'use client';

import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

function Employees() {
  const { employees, updateEmployee } = useEmployeeContext(); // Contexto com os funcionários
  const router = useRouter();

  const handleRowClick = (employeeId: number) => {
    router.push(`/employees/${employeeId}`); // Redireciona para a edição
  };

  const handleAddEmployee = () => {
    router.push("/contract-display/"); // Redireciona para o formulário de adição
  };

  const toggleEmployeeStatus = (employeeId: number, isActive: boolean) => {
    updateEmployee(employeeId, { active: !isActive }); // Alterna entre ativo/inativo
  };

  const handleDownload = (pdfFile: Blob | MediaSource, nome: string) => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${nome}.pdf`; // Use the provided nome parameter
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Free up the temporary URL
    } else {
      alert('Nenhum arquivo disponível para download.');
    }
  };

  return (
    <div>
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
                <h1 className="text-4xl font-extrabold text-white">Funcionários</h1>
                <button
                  onClick={handleAddEmployee}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                  Adicionar Funcionário
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-700 text-gray-300 rounded-lg">
                  <thead className="bg-gray-800">
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
                  <tbody className="bg-gray-700">
                    {employees.length > 0 ? (
                      employees.map((employee, index) => (
                        <tr
                          key={employee.id}
                          className={`hover:bg-gray-600 transition-all duration-200 cursor-pointer ${
                            !employee.active ? "bg-gray-500 text-gray-400" : ""
                          }`}
                          onClick={() => handleRowClick(employee.id)} // Evento de clique
                        >
                          <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.name || "Não informado"}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.role || "Não informado"}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.registration || "Não informado"}</td>
                          <td className="px-4 py-2 border border-gray-600">{employee.cpf || "Não informado"}</td>
                          <td className="px-4 py-2 border border-gray-600">
                            {employee.active ? "Ativo" : "Inativo"}
                          </td>
                          <td className="px-4 py-2 border border-gray-600 flex space-x-2">
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
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                (employee.id);
                              }}
                              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                            >
                              Baixar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-2 text-center border border-gray-600">
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
