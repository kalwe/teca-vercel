"use client";
import React, { useEffect, useRef, useState } from "react";

interface Employee {
  cod_pessoa: string;
  nome: string;
}

interface DropdownCheckboxEmployeeProps {
  value: string;
  onChange: (value: string) => void;
}

const DropdownCheckboxEmployee: React.FC<DropdownCheckboxEmployeeProps> = ({ value = "", onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/data/funcionarios.json");
        if (!response.ok) {
          throw new Error("Erro ao carregar funcionários.");
        }
        const data = await response.json();

        const employeesArray: Employee[] = Array.isArray(data)
          ? data
          : data && Array.isArray(data.itens)
          ? data.itens
          : [];
        setEmployees(employeesArray);
      } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
      }
    };

    fetchEmployees();
  }, []);


  const handleSelect = (employeeId: string) => {
    onChange(employeeId);
    setIsDropdownOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-full flex justify-between items-center text-left"
      >
        <span>
          {value
            ? employees.find((emp) => emp.cod_pessoa === value)?.nome
            : "Escolha um funcionário"}
        </span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute z-50 w-full bg-white border rounded-md mt-1 shadow-md"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <ul className="p-2">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <li
                  key={employee.cod_pessoa}
                  className={`p-2 cursor-pointer ${
                    value === employee.cod_pessoa ? "bg-gray-300" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSelect(employee.cod_pessoa)}
                >
                  {employee.nome}
                </li>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                Nenhum funcionário disponível.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckboxEmployee;
