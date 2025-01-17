'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ContractForm from "@/app/components/forms/contract-form";
import { useEmployeeContext } from "@/app/context/EmployeeContext";

export default function EmployeeDetailPage() {
  const { employees, updateEmployee } = useEmployeeContext();
  const [formData, setFormData] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const employeeId = Number(params.id); // Obter o ID da rota

    if (isNaN(employeeId)) {
      alert("ID inválido! Redirecionando...");
      router.push("/contract-display/employee");
      return;
    }

    const employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) {
      alert("Funcionário não encontrado! Redirecionando...");
      router.push("/contract-display/employee");
    } else {
      setFormData(employee);
    }
  }, [params, employees, router]);

  const handleSave = (updatedData: any) => {
    updateEmployee(updatedData.id, updatedData);
    alert("Dados atualizados com sucesso!");
    router.push("/contract-display/employee");
  };

  const handleCancel = () => {
    router.push("/contract-display/employee");
  };

  if (!formData) {
    return <p>Carregando os dados do funcionário...</p>;
  }

  return (
    <div className="w-[90%] mx-auto mt-10">
      <h1 className="text-center text-4xl font-bold mb-6">Atualizar funcionário</h1>
      <ContractForm
        mode="edit"
        employeeData={formData}
        onSave={handleSave}
        onCancel={handleCancel} isEditable={false}      />
    </div>
  );
}
