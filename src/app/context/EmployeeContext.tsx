'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the Employee interface
interface Employee {
  pessoaFisica: {};
  funcionario: {};
  address: {};
  contact: {};
  bank: {};
  vestuario: {};
  id: number;
  name: string;
  role: string;
  registration: string;
  cpf: string;
  supervisor: boolean;
  manager: boolean;
  active: boolean;
}

// Define the context properties
interface EmployeeContextProps {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: number, updates: Partial<Employee>) => void;
  deactivateEmployee: (id: number) => void; // Adicionada a função deactivateEmployee
}

// Create the context
const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

// EmployeeProvider to wrap the app
export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Função para adicionar um funcionário
  const addEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  // Função para atualizar um funcionário
  const updateEmployee = (id: number, updates: Partial<Employee>) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, ...updates } : employee
      )
    );
  };

  // Função para desativar um funcionário
  const deactivateEmployee = (id: number) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, active: false } : employee
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deactivateEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to access the EmployeeContext
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within an EmployeeProvider");
  }
  return context;
};
