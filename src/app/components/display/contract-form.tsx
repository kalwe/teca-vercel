"use client";

import { useState } from "react";
import { PessoaFisica } from "../switch-tabs/person";
import { Funcionario } from "../switch-tabs/employee";
import { Address } from "../switch-tabs/address";
import { Contact } from "../switch-tabs/Contact";
import { Bank } from "../switch-tabs/bank";
import { Clothing } from "../switch-tabs/clothing";
import { ContractFormProps } from "@/app/types/employee";
import { personSchema } from "@/app/schemas/personSchema";
import { employeeSchema } from "@/app/schemas/employeeSchema";
import { addressSchema } from "@/app/schemas/addressSchema";
import { contactSchema } from "@/app/schemas/contactSchema";
import { bankAccountSchema } from "@/app/schemas/bankAccountSchema";
import { clothingSchema } from "@/app/schemas/clothingSchema";

export default function ContractForm({ mode, employeeData, isEditable }: ContractFormProps) {

  const [selectedTab, setSelectedTab] = useState(0);

  const [pessoaFisica, setPessoaFisica] = useState(employeeData?.pessoaFisica || {});
  const [funcionario, setFuncionario] = useState(() => employeeData?.funcionario || {});
  const [contact, setContact] = useState(() => employeeData?.contact || {});
  const [bankAccount, setBankAccount] = useState(() => employeeData?.bank_account || {});
  const [clothing, setClothing] = useState(() => employeeData?.clothing || {});

  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, state: pessoaFisica, setState: setPessoaFisica, schema: personSchema },
    { name: "FUNCIONÁRIO", component: Funcionario, state: funcionario, setState: setFuncionario, schema: employeeSchema },
    { name: "ENDEREÇO", component: Address, state: address, setState: setAddress, schema: addressSchema },
    { name: "CONTATO", component: Contact, state: contact, setState: setContact, schema: contactSchema },
    { name: "DADOS BANCÁRIOS", component: Bank, state: bankAccount, setState: setBankAccount, schema: bankAccountSchema },
    { name: "VESTUÁRIO", component: Clothing, state: clothing, setState: setClothing, schema: clothingSchema }
  ];

  const CurrentComponent = tabs[selectedTab]?.component as React.ElementType;
  const currentState = tabs[selectedTab]?.state;

  const handleInputChange = (data: Record<string, unknown>) => {
    const setCurrentState = tabs[selectedTab]?.setState;

    if (setCurrentState) {
      setCurrentState(...data);
    } else {
      console.error("Erro: Nenhum setState definido para a aba atual.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Menu Lateral */}
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

          {/* Conteúdo */}
          <div className="w-full md:w-3/4 p-6">
            {CurrentComponent && (
                <CurrentComponent
                data={currentState}
                onChange={handleInputChange}
                isEditable={isEditable}
                mode={mode}
                onNext={() => setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))}
                employee
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
