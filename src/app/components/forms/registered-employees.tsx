'use client';

import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

function Employees() {
  const { employees, updateEmployee } = useEmployeeContext();
  const router = useRouter();

  const handleRowClick = (employeeId: number) => {
    router.push(`/employees/${employeeId}`);
  };

  const handleAddEmployee = () => {
    router.push("/contract-display/");
  };

  const toggleEmployeeStatus = (employeeId: number, isActive: boolean) => {
    updateEmployee(employeeId, { active: !isActive });
  };

  const handleDownload = (pdfFile: Blob | MediaSource, nome: string) => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${nome}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert("Nenhum arquivo disponível para download.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 "
    style={{ background: " linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82)"}}
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
                      <td className="px-4 py-2 border border-gray-700">{employee.name || "Não informado"}</td>
                      <td className="px-4 py-2 border border-gray-700">{employee.role || "Não informado"}</td>
                      <td className="px-4 py-2 border border-gray-700">{employee.registration || "Não informado"}</td>
                      <td className="px-4 py-2 border border-gray-700">{employee.cpf || "Não informado"}</td>
                      <td className="px-4 py-2 border border-gray-700">{employee.active ? "Ativo" : "Inativo"}</td>
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(new Blob(), employee.name);
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
                    <td colSpan={7} className="px-4 py-2 text-center border border-gray-700">
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
  );
}

export default Employees;