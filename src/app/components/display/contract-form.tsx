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
import { employeeSchema } from "@/app/schemas/employeeModelSchema";
import { addressSchema } from "@/app/schemas/addressSchema";
import { contactSchema } from "@/app/schemas/contactSchema";
import { bankAccountSchema } from "@/app/schemas/bankAccountSchema";
import { clothingSchema } from "@/app/schemas/clothingSchema";

export default function ContractForm({ mode, employeeData, onSave, onCancel, isEditable }: ContractFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // Estados individuais por aba (sanitizados)
  const [pessoaFisica, setPessoaFisica] = useState(personModelSchema.parse({}));
  const [funcionario, setFuncionario] = useState(employeeSchema.parse({}));
  const [address, setAddress] = useState(addressSchema.parse({}));
  const [contact, setContact] = useState(contactSchema.parse({}));
  const [bankAccount, setBankAccount] = useState(bankAccountSchema.parse({}));
  const [clothing, setClothing] = useState(clothingSchema.parse({}));

  // Tabs
  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, state: pessoaFisica, setState: setPessoaFisica, type: "person" },
    { name: "FUNCIONÁRIO", component: Funcionario, state: funcionario, setState: setFuncionario, type: "employee" },
    { name: "ENDEREÇO", component: Address, state: address, setState: setAddress, type: "address" },
    { name: "CONTATO", component: Contact, state: contact, setState: setContact, type: "contact" },
    { name: "DADOS BANCÁRIOS", component: Bank, state: bankAccount, setState: setBankAccount, type: "bank_account" },
    { name: "VESTUÁRIO", component: Clothing, state: clothing, setState: setClothing, type: "clothing" }
  ];

  const CurrentComponent = tabs[selectedTab]?.component;
  const setState = tabs[selectedTab]?.setState;
  const currentTabType = tabs[selectedTab]?.type;

  // Se for modo "editar", preenche os estados com os dados do funcionário
  useEffect(() => {
    if (mode === "edit" && employeeData) {
      try {
        setPessoaFisica(personModelSchema.parse(employeeData.pessoaFisica || {}));
        setFuncionario(employeeSchema.parse(employeeData.funcionario || {}));
        setAddress(addressSchema.parse(employeeData.address || {}));
        setContact(contactSchema.parse(employeeData.contact || {}));
        setBankAccount(bankAccountSchema.parse(employeeData.bank_account || {}));
        setClothing(clothingSchema.parse(employeeData.clothing || {}));
      } catch (error) {
        console.error("❌ Erro ao carregar dados para edição:", error);
        alert("Erro ao carregar os dados do funcionário.");
      }
    }
  }, [mode, employeeData]);

  // Atualiza o estado correto com os dados alterados
  const handleInputChange = (updatedData: any) => {
    setState((prev: any) => ({ ...prev, ...updatedData }));
  };

  // Envio dos dados ao backend
  const handleSave = async () => {
    setLoading(true);
    try {
      // Monta e sanitiza os dados antes do envio
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

      alert("✅ Funcionário salvo com sucesso!");
      router.push("/contract-display/employee");
    } catch (error) {
      console.error("❌ Erro ao salvar funcionário:", error);
      alert("Ocorreu um erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
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
              data={tabs[selectedTab].state} // Passando o tipo correto de `data` para o componente
              onChange={handleInputChange}
              isEditable={mode === "create" || mode === "edit"}
              mode={mode}
              onNext={() => setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))}
              onPrev={() => setSelectedTab((prev) => Math.max(prev - 1, 0))}
            />

            {/* Botão de salvar somente na última aba */}
            {selectedTab === tabs.length - 1 && (
              <button
                onClick={handleSave}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Finalizar e Enviar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
