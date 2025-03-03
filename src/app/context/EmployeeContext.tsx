"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { EmployeeType } from "../types/employee"
import { EmployeeService } from "../services/employeeService"

interface EmployeeContextProps {
  employees: EmployeeType[]
  addEmployee: (newEmployee: EmployeeType) => Promise<void>
  updateEmployee: (id: number, updates: Partial<EmployeeType>) => Promise<void>
  deactivateEmployee: (id: number) => Promise<void>
  getEmployeeById: (id: number) => Promise<void>
}

const EmployeeContext = createContext({} as EmployeeContextProps)

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<EmployeeType[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await EmployeeService.getAllEmployees()
        setEmployees(employees)
      } catch (error) {
        console.error("Erro ao carregar funcionários da API:", error)
      }
    }

    fetchEmployees()
  }, [])

  // Adicionar funcionário
  const addEmployee = async (newEmployee: EmployeeType) => {
    try {
      const addedEmployee = await EmployeeService.createEmployee(newEmployee)
      setEmployees((prev) => [ ...prev, addedEmployee ])
      alert("Funcionário adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error)
      alert("Erro ao adicionar funcionário. Tente novamente.")
    }
  }

  const updateEmployee = async (id: number, updates: Partial<EmployeeType>) => {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(id, updates)
      setEmployees((prev) =>
        prev.map((employee) => (employee.id === id ? updatedEmployee : employee))
      )
      alert("Funcionário atualizado com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error)
      alert("Erro ao atualizar funcionário. Tente novamente.")
    }
  }

  const deactivateEmployee = async (id: number) => {
    try {
      const inactiveEmployee = await EmployeeService.deleteEmployee(id)
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === id ? { ...employee, inactiveEmployee } : employee
        )
      )
      alert("Funcionário desativado com sucesso!")
    } catch (error) {
      console.error("Erro ao desativar funcionário:", error)
      alert("Erro ao desativar funcionário. Tente novamente.")
    }
  }

  const getEmployeeById = async (id: number) => {
    // return employees.find((employee) => employee.id === id)
    try {
      const employeeById = await EmployeeService.getEmployeeById(id)
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === id ? { ...employee, employeeById } : employee
        )
      )
      alert("Funcionário desativado com sucesso!")
    } catch (error) {
      console.error("Erro ao desativar funcionário:", error)
      alert("Erro ao desativar funcionário. Tente novamente.")
    }
  }

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deactivateEmployee, getEmployeeById }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext)
  return context
}
