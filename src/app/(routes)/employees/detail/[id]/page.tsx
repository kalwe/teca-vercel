'use client';

import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmployeeDetail({ params }: { params: { id: string } }) {
  const { employees } = useEmployeeContext();
  const router = useRouter();
  const employeeId = Number(params.id);
  const employee = employees.find((emp) => emp.id === employeeId);

  useEffect(() => {
    if (!employee) {
      alert("Funcionário não encontrado!");
      router.push("/employees");
    }
  }, [employee, router]);

  if (!employee) return null;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Detalhes do Funcionário</h1>
      <div className="mb-4">
        <strong>Nome:</strong> {employee.name}
      </div>
      <div className="mb-4">
        <strong>Função:</strong> {employee.role}
      </div>
      <div className="mb-4">
        <strong>Matrícula:</strong> {employee.registration}
      </div>
      <div className="mb-4">
        <strong>CPF:</strong> {employee.cpf}
      </div>
      <div className="mb-4">
        <strong>Encarregado:</strong> {employee.supervisor ? "Sim" : "Não"}
      </div>
      <div className="mb-4">
        <strong>Gerente:</strong> {employee.manager ? "Sim" : "Não"}
      </div>
      <div className="mb-4">
        <strong>Status:</strong>{" "}
        <span
          className={`px-2 py-1 rounded text-white ${
            employee.active ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {employee.active ? "Ativo" : "Desativado"}
        </span>
      </div>
    </div>
  );
}
