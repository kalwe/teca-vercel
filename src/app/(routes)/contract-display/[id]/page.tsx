"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import ContractForm from "@/app/components/display/contract-form";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { EmployeeService } from "@/app/services/employeeService";
import { Employee } from "@/app/types/employee";
import "../style.css";
import { Navigation } from "@/app/components/navigation/navigation";

// Definição do endpoint da API (ajuste conforme necessário)
const API_URL = "https://api.example.com/employees";

export default function EmployeeDetailPage() {
  const { employees, updateEmployee } = useEmployeeContext();
  const [formData, setFormData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const employeeId = Number(params.id);

    if (isNaN(employeeId)) {
      alert("ID inválido. Redirecionando...");
      router.replace("/contract-display/employee");
      return;
    }

    const fetchEmployee = async () => {
      try {
        let employee = employees.find((emp) => emp.id === employeeId);

        if (!employee) {
          employee = await EmployeeService.getEmployeeById(employeeId);
        }

        if (employee) {
          setFormData(employee);
        } else {
          alert("Funcionário não encontrado. Redirecionando...");
          router.replace("/contract-display/employee");
        }
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
        alert("Erro ao carregar dados do funcionário. Tente novamente.");
        router.replace("/contract-display/employee");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [params.id, employees, router]);

  const handleSave = async (updatedData: Employee) => {
    setLoading(true);
    try {
      // Atualiza funcionário via API
      const response = await axios.patch(`${API_URL}/${updatedData.id}`, updatedData);

      // Atualiza o contexto com os novos dados
      updateEmployee(updatedData.id, response.data);

      alert("Funcionário atualizado com sucesso.");
      router.push("/contract-display/employee");
    } catch (error: any) {
      console.error("Erro ao atualizar funcionário:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erro ao atualizar funcionário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/contract-display/employee");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg font-semibold">Carregando dados do funcionário...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <ContractForm
        mode="edit"
        employeeData={formData}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditable={false}
      />
    </div>
  );
}
