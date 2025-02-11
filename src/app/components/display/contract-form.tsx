"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PessoaFisica } from "../switch-tabs/person";
import { Funcionario } from "../switch-tabs/employee";
import { Address } from "../switch-tabs/address";
import { Contact } from "../switch-tabs/Contact";
import { Bank } from "../switch-tabs/bank";
import { Clothing } from "../switch-tabs/clothing";
import { ContractFormProps } from "@/app/types/employee";
import { personModelSchema } from "@/app/schemas/personSchema";
import { employeeSchema } from "@/app/schemas/employeeSchema";
import { addressSchema } from "@/app/schemas/addressSchema";
import { contactSchema } from "@/app/schemas/contactSchema";
import { bankAccountSchema } from "@/app/schemas/bankAccountSchema";
import { clothingSchema } from "@/app/schemas/clothingSchema";

export default function ContractForm({ mode, employeeData, onSave, onCancel, isEditable }: ContractFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const [pessoaFisica, setPessoaFisica] = useState(() => employeeData?.pessoaFisica || {});
  const [funcionario, setFuncionario] = useState(() =>employeeData?.funcionario || {});
  const [address, setAddress] = useState(() => employeeData?.address || {});
  const [contact, setContact] = useState(() => employeeData?.contact || {});
  const [bankAccount, setBankAccount] = useState(() => employeeData?.bank_account || {});
  const [clothing, setClothing] = useState(() => employeeData?.clothing || {});

  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, state: pessoaFisica, setState: setPessoaFisica, schema: personModelSchema },
    { name: "FUNCIONÁRIO", component: Funcionario, state: funcionario, setState: setFuncionario, schema: employeeSchema },
    { name: "ENDEREÇO", component: Address, state: address, setState: setAddress, schema: addressSchema },
    { name: "CONTATO", component: Contact, state: contact, setState: setContact, schema: contactSchema },
    { name: "DADOS BANCÁRIOS", component: Bank, state: bankAccount, setState: setBankAccount, schema: bankAccountSchema },
    { name: "VESTUÁRIO", component: Clothing, state: clothing, setState: setClothing, schema: clothingSchema }
  ];

  const CurrentComponent = tabs[selectedTab]?.component as React.ElementType;
  const currentState = tabs[selectedTab]?.state;
  const setState = tabs[selectedTab]?.setState;
  const schema = tabs[selectedTab]?.schema;

  const handleNext = () => {
    try {
      schema.parse(currentState);
      setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1));
    } catch (error: any) {
      alert("Corrija os erros antes de avançar.");
      console.error("Erro de validação:", error.errors);
    }
  };

  const handleInputChange = (updatedData: any) => {
    if (setState) {
      setState((prev: any) => ({ ...prev, ...updatedData }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const employeePayload = {
        pessoaFisica: personModelSchema.parse(pessoaFisica),
        funcionario: employeeSchema.parse(funcionario),
        address: addressSchema.parse(address),
        contact: contactSchema.parse(contact),
        bank_account: bankAccountSchema.parse(bankAccount),
        clothing: clothingSchema.parse(clothing),
        contract_date: new Date().toISOString().split("T")[0]
      };

      let response;
      if (mode === "create") {
        response = await fetch("/api/employee", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeePayload)
        });
      } else if (mode === "edit") {
        response = await fetch(`/api/employee/${employeeData?.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeePayload)
        });
      }

      if (!response?.ok) {
        throw new Error("Erro ao salvar funcionário.");
      }

      alert("Funcionário salvo com sucesso!");
      router.push("/contract-display/employee");
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      alert("Ocorreu um erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
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

          <div className="w-full md:w-3/4 p-6">
            {CurrentComponent && (
              <CurrentComponent
                data={currentState}
                onChange={handleInputChange}
                isEditable={isEditable}
                mode={mode}
                onNext={handleNext}
                onPrev={() => setSelectedTab((prev) => Math.max(prev - 1, 0))}
              />
            )}

            {selectedTab === tabs.length - 1 && (
              <button onClick={handleSave} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50" disabled={loading}>
                {loading ? "Salvando..." : "Finalizar e Enviar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
