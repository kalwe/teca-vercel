"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Employee, EmployeeContextProps} from "../types/employee";


const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Load employees from localStorage
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      try {
        const parsedEmployees: Employee[] = JSON.parse(storedEmployees);
        setEmployees(parsedEmployees);
      } catch (error) {
        console.error("Erro ao carregar funcionários do localStorage:", error);
      }
    }
  }, []);

  // Save employees to localStorage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem("employees", JSON.stringify(employees));
    } catch (error) {
      console.error("Erro ao salvar funcionários no localStorage:", error);
    }
  }, [employees]);

  const addEmployee = (newEmployee: Employee) => {
    setEmployees((prev) => {
      const exists = prev.some(
        (emp) => emp.cpf === newEmployee.cpf || emp.registration === newEmployee.registration
      );

      if (exists) {
        alert(`Erro: O funcionário com CPF "${newEmployee.cpf}" ou matrícula "${newEmployee.registration}" já existe.`);
        return prev; // Keep the state unchanged if the employee already exists
      }

      alert("Funcionário adicionado com sucesso!");
      return [...prev, newEmployee];
    });
  };

  const updateEmployee = (id: number, updates: Partial<Employee>) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, ...updates } : employee
      )
    );
    alert("Funcionário atualizado com sucesso!");
  };

  const deactivateEmployee = (id: number) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, active: false } : employee
      )
    );
  };

  const getEmployeeById = (id: number): Employee | undefined => {
    return employees.find((employee) => employee.id === id);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deactivateEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext deve ser usado dentro de um EmployeeProvider.");
  }
  return context;
};
