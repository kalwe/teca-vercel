"use client"

import { useState } from "react"
import { PessoaFisica } from "../switch-tabs/person"
import { Funcionario } from "../switch-tabs/employee"
import { Address } from "../switch-tabs/address"
import { Contact } from "../switch-tabs/Contact"
import { Bank } from "../switch-tabs/bank"
import { Clothing } from "../switch-tabs/clothing"
import { useRouter } from "next/navigation"
import { ContractFormProps } from "@/app/types/employee"

export default function ContractForm({
  employeeData = {},
  isEditable = true,
  mode = "create",
  onSave,
  onCancel,
}: ContractFormProps)  {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const [formData, setFormData] = useState({
    pessoaFisica: employeeData ?? {},
    funcionario: employeeData ?? {},
    address: employeeData?.address ?? {},
    contact: employeeData?.contact ?? {},
    bankAccount: employeeData?.bank_account ?? {},
    clothing: employeeData?.clothing ?? {},
  })

  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, key: "employee" },
    { name: "FUNCIONÁRIO", component: Funcionario, key: "employee" },
    { name: "ENDEREÇO", component: Address, key: "address" },
    { name: "CONTATO", component: Contact, key: "contact" },
    { name: "DADOS BANCÁRIOS", component: Bank, key: "bankAccount" },
    { name: "VESTUÁRIO", component: Clothing, key: "clothing" },
  ];

  const CurrentComponent = tabs[selectedTab].component;
  const currentKey = tabs[selectedTab].key;

  const handleInputChange = (data: Record<string, unknown>) => {
    setFormData((prevData) => ({
      ...prevData,
      [currentKey]: { ...data },
    }));
  };

  const handleNextTab = () => setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1));

  const handlePrevTab = () => setSelectedTab((prev) => Math.max(prev - 1, 0));

  return (
    <>
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar Menu */}
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

                    {/* Content Area */}
                    <div className="w-full md:w-3/4 p-6">
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <CurrentComponent
                            data={formData[currentKey] || {}}
                            onChange={handleInputChange}
                            isEditable={isEditable}
                            mode={mode}
                            onNext={handleNextTab}
                            onPrev={handlePrevTab}
                        />
                        {loading && <p className="text-white text-sm mt-2">Salvando...</p>}
                    </div>
                </div>
            </div>
        </div>
    </>
);
};
