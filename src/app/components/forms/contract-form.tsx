"use client";

import { useState, useEffect } from "react";
import { PessoaFisica } from "../switch-tabs/pessoa-fisica";
import { Funcionario } from "../switch-tabs/funcionario";
import { Address } from "../switch-tabs/address";
import { Contact } from "../switch-tabs/Contact";
import { Bank } from "../switch-tabs/bank";
import { Vestuario } from "../switch-tabs/vestuario";
import { useRouter } from "next/navigation";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { ContractFormProps } from "@/app/types/employee";

export default function ContractForm({ mode, employeeData }: ContractFormProps) {
  const { employees, addEmployee, updateEmployee } = useEmployeeContext();
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    pessoaFisica: {
      nome: "",
      cpf: "",
      genero: "",
      estadoCivil: "",
      rg: "",
      orgaoExpedidor: "",
      selectedDate: null,
    },
    funcionario: {
      cargo: "",
      matricula: "",
      encarregado: false,
      gerente: false,
    },
    address: {},
    contact: {},
    bank: {},
    vestuario: {},
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, key: "pessoaFisica" },
    { name: "FUNCIONÁRIO", component: Funcionario, key: "funcionario" },
    { name: "ENDEREÇO", component: Address, key: "address" },
    { name: "CONTATO", component: Contact, key: "contact" },
    { name: "DADOS BANCÁRIOS", component: Bank, key: "bank" },
    { name: "VESTUÁRIO", component: Vestuario, key: "vestuario" },
  ];

  useEffect(() => {
    if (mode === "edit" && employeeData) {
      setFormData(employeeData);
    }
  }, [mode, employeeData]);

  const handleInputChange = (updatedData: any, key: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: updatedData,
    }));
  };

  const handleSave = () => {
    const newEmployee = {
      id: mode === "edit" ? employeeData.id : Math.random(),
      name: formData.pessoaFisica.nome,
      role: formData.funcionario.funcao,
      registration: formData.funcionario.matricula,
      matricula: formData.funcionario.matricula,
      cpf: formData.pessoaFisica.cpf,
      supervisor: formData.funcionario.encarregado,
      manager: formData.funcionario.gerente,
      active: true,
      pessoaFisica: formData.pessoaFisica,
      funcionario: formData.funcionario,
      address: formData.address,
      contact: formData.contact,
      bank: formData.bank,
      vestuario: formData.vestuario,
    };

    if (!newEmployee.cpf || newEmployee.cpf.trim() === "") {
      alert("Erro: O CPF não pode estar vazio.");
      return;
    }

    if (!newEmployee.registration || newEmployee.registration.trim() === "") {
      alert("Erro: A matrícula não pode estar vazia.");
      return;
    }

    if (mode === "add") {
      const exists = employees.some(
        (emp) =>
          emp.cpf === newEmployee.cpf || emp.registration === newEmployee.registration
      );

      if (exists) {
        alert(
          `Erro: O funcionário com CPF \"${newEmployee.cpf}\" ou matrícula \"${newEmployee.registration}\" já existe.`
        );
        return;
      }
      addEmployee(newEmployee);
      alert("Funcionário adicionado com sucesso!");
    } else {
      updateEmployee(newEmployee.id, newEmployee);
      alert("Funcionário atualizado com sucesso!");
    }

    router.push("/contract-display/employee");
  };

  const isEditable = mode !== "view";
  const CurrentComponent = tabs[selectedTab].component;
  const currentTabKey = tabs[selectedTab].key;

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ background: " linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82)", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Tabs Navigation */}
          <div className="w-full md:w-1/4 bg-gray-900 text-white">
            <div className="flex flex-col space-y-2 p-4">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => setSelectedTab(index)}
                  className={`py-2 px-4 rounded-lg transition-all duration-200 ${
                    selectedTab === index
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-green-400 hover:text-white"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="w-full md:w-3/4 p-6">
            <CurrentComponent
              data={formData[currentTabKey]}
              onChange={(updatedData: any) =>
                handleInputChange(updatedData, currentTabKey)
              }
              isEditable={isEditable}
              mode={mode}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between p-4 border-t border-gray-700">
          {selectedTab > 0 && (
            <button
              onClick={() => setSelectedTab((prev) => Math.max(prev - 1, 0))}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Voltar
            </button>
          )}
          {selectedTab < tabs.length - 1 ? (
            <button
              onClick={() =>
                setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))
              }
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}