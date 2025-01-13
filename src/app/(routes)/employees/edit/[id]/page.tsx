'use client';

import { useEmployeeContext } from "@/app/context/EmployeeContext"; // Contexto de funcionários
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContractForm from "@/app/components/forms/contract-form";

export default function EditEmployee({ params }: { params: { id: string } }) {
  const { employees, updateEmployee } = useEmployeeContext();
  const router = useRouter();
  const employeeId = parseInt(params.id); // Converte o ID para número
  const [formData, setFormData] = useState<any | null>(null);

  useEffect(() => {
    // Recupera os dados do funcionário com base no ID
    if (employees && employees.length > 0) {
      const employee = employees.find((emp) => emp.id === employeeId);

      if (!employee) {
        alert("Funcionário não encontrado!");
        router.push("/employees");
      } else {
        // Inicializa o formData com os dados do funcionário
        setFormData({
          pessoaFisica: employee.pessoaFisica || {
            nome: "",
            cpf: "",
            genero: "",
            estadoCivil: "",
            rg: "",
            orgaoExpedidor: "",
            selectedDate: null,
          },
          funcionario: employee.funcionario || {
            matricula: "",
            admissionDate: null,
            removalDate: null,
            funcao: "",
            encarregado: false,
            gerente: false,
            ativo: true,
          },
          address: employee.address || {
            logradouro: "",
            bairro: "",
            cep: "",
            estado: "",
            municipio: "",
          },
          contact: employee.contact || {
            tipoContato: "",
            informacao: "",
          },
          bank: employee.bank || {
            banco: "",
            agencia: "",
            conta: "",
            tipoConta: "",
          },
          vestuario: employee.vestuario || {
            tamanhoCamisa: "",
            tamanhoCalca: "",
            tamanhoCalcado: "",
          },
        });
      }
    }
  }, [employeeId, employees, router]);

  const handleSave = () => {
    // Atualiza o funcionário no contexto com os novos dados
    if (formData) {
      updateEmployee(employeeId, formData);
      router.push("/employees");
    }
  };

  const handleCancel = () => {
    router.push("/employees");
  };

  if (!formData) {
    return (
      <div className="text-center mt-10">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <ContractForm
      mode="edit" // Define o modo para edição
      employeeData={formData} // Passa os dados do funcionário
      onSave={handleSave} // Salva os dados editados
      onCancel={handleCancel} // Cancela a edição
      formData={undefined} setFormData={function (value: any): void {
        throw new Error("Function not implemented.");
      } } isEditable={false}    />
  );
}
