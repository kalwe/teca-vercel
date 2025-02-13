'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Interface do Funcionário
interface Employee {
  id: string;
  name: string;
  weeklyHours?: number;
}

// Função para buscar funcionários da API real
const fetchEmployeesFromAPI = async (searchTerm = ''): Promise<Employee[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employees?search=${searchTerm}`
    );
    if (!response.ok) throw new Error('Erro ao buscar funcionários');

    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar funcionários:', error);
    return [];
  }
};

function HoursBank() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      const allEmployees = await fetchEmployeesFromAPI();
      setEmployees(allEmployees);
      setFilteredEmployees(allEmployees);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  // Função para filtrar os funcionários conforme a busca do usuário
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter((employee) =>
          employee.name.toLowerCase().includes(value)
        )
      );
    }
  }, [employees]);

  const changePage = (id: string) => {
    router.push(`/hoursbank-display/employee/${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900"
      style={{
        background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))"
      }}>
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border relative flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-white text-center">Banco de Horas</h1>

        {/* Barra de Pesquisa */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar funcionário..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>

        {/* Lista de Funcionários */}
        <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
          <div className="flex justify-between items-center border-b border-gray-600 pb-4">
            <h2 className="text-gray-300 font-semibold">Funcionário</h2>
            <h2 className="text-gray-300 font-semibold">Horas semanais</h2>
          </div>

          {loading ? (
            <p className="text-gray-300 text-center mt-4">Carregando funcionários...</p>
          ) : (
            <div className="overflow-y-auto mt-4" style={{ maxHeight: '300px' }}>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex justify-between items-center py-3 px-4 bg-gray-800 rounded-md mb-2 cursor-pointer hover:bg-gray-700 transition-all duration-200"
                    onClick={() => changePage(employee.id)}
                  >
                    <span className="text-white">{employee.name}</span>
                    <span className="text-white">
                      {employee.weeklyHours !== undefined ? `${employee.weeklyHours} hrs` : 'N/A'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-300 text-center">Nenhum funcionário encontrado.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HoursBank;
