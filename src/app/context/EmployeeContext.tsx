"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Employee } from "../types/employee";
import { EmployeeService } from "../services/employeeService";

interface EmployeeContextProps {
  employees: Employee[];
  addEmployee: (newEmployee: Employee) => Promise<void>;
  updateEmployee: (id: number, updates: Partial<Employee>) => Promise<void>;
  deactivateEmployee: (id: number) => Promise<void>;
  getEmployeeById: (id: number) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Carregar funcionários da API ao iniciar o contexto
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await EmployeeService.getAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Erro ao carregar funcionários da API:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Adicionar funcionário
  const addEmployee = async (newEmployee: Employee) => {
    try {
      const addedEmployee = await EmployeeService.createEmployee(newEmployee);
      setEmployees((prev) => [...prev, addedEmployee]);
      alert("Funcionário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      alert("Erro ao adicionar funcionário. Tente novamente.");
    }
  };

  // Atualizar funcionário
  const updateEmployee = async (id: number, updates: Partial<Employee>) => {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(id, updates);
      setEmployees((prev) =>
        prev.map((employee) => (employee.id === id ? updatedEmployee : employee))
      );
      alert("Funcionário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Erro ao atualizar funcionário. Tente novamente.");
    }
  };

  // Desativar funcionário
  const deactivateEmployee = async (id: number) => {
    try {
      await EmployeeService.updateEmployee(id, { active: false });
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === id ? { ...employee, active: false } : employee
        )
      );
      alert("Funcionário desativado com sucesso!");
    } catch (error) {
      console.error("Erro ao desativar funcionário:", error);
      alert("Erro ao desativar funcionário. Tente novamente.");
    }
  };

  // Buscar funcionário por ID
  const getEmployeeById = (id: number): Employee | undefined => {
    return employees.find((employee) => employee.id === id);
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deactivateEmployee, getEmployeeById }}
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
