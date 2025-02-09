'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Employee {
  id: string;
  name: string;
  weeklyHours?: number; // Placeholder for API integration
}

function HoursBank() {
  const [employees, setEmployees] = useState<Employee[]>([]); // State for employees
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Example to load initial employees (replace this with actual API or data context logic)
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(storedEmployees);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changePage = (id: string) => {
    router.push(`/hoursbank-display/employee/${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900"
    style={{
      background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))"
    }}
    >
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border relative flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-white text-center">Banco de Horas</h1>

        {/* Search Bar */}
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

        {/* Employees List */}
        <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
          <div className="flex justify-between items-center border-b border-gray-600 pb-4">
            <h2 className="text-gray-300 font-semibold">Funcionário</h2>
            <h2 className="text-gray-300 font-semibold">Horas semanais</h2>
          </div>

          <div
            className="overflow-y-auto mt-4"
            style={{ maxHeight: '300px' }}
          >
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
        </div>
      </div>
    </div>
  );
}

export default HoursBank;
