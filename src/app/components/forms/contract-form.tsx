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
  const { employees, addEmployee, updateEmployee } = useEmployeeContext(); // Corrigido para incluir `employees`
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
    console.log(newEmployee);

    // Validações
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
          `Erro: O funcionário com CPF "${newEmployee.cpf}" ou matrícula "${newEmployee.registration}" já existe.`
        );
        return;
      }
      addEmployee(newEmployee);
      alert("Funcionário adicionado com sucesso!");
    } else {
      updateEmployee(newEmployee.id, newEmployee);
      alert("Funcionário atualizado com sucesso!");
    }

    router.push("/contract-display/employee"); // Redireciona para a lista
  };

  const isEditable = mode !== "view";
  const CurrentComponent = tabs[selectedTab].component;
  const currentTabKey = tabs[selectedTab].key;

  return (
    <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
      <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6 relative">
        <div className="bg-[#829171] w-[98%] h-[95%] rounded-[26px] absolute"></div>
        <div
          style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }}
          className="bg-[#7A7A7A] w-[87%] h-[85%] rounded-[18px]"
        >
          {/* Navegação entre abas */}
          <div className="flex space-x-4 p-4 border-b border-gray-300">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(index)}
                className={`px-4 py-2 rounded-t-lg ${
                  selectedTab === index
                    ? "bg-white text-gray-700 font-bold"
                    : "bg-transparent text-gray-400"
                } hover:bg-gray-600 hover:text-white`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Conteúdo da aba atual */}
          <div className="p-8">
            <CurrentComponent
              data={formData[currentTabKey]}
              onChange={(updatedData: any) =>
                handleInputChange(updatedData, currentTabKey)
              }
              isEditable={isEditable}
              mode={mode}
            />
          </div>

          {/* Botões de ação */}
          <div className="flex justify-between px-8 pb-4">
            {selectedTab > 0 && (
              <button
                onClick={() => setSelectedTab((prev) => Math.max(prev - 1, 0))}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Voltar
              </button>
            )}
            {selectedTab < tabs.length - 1 ? (
              <button
                onClick={() =>
                  setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))
                }
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
