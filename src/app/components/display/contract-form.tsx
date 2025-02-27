"use client";

import { useState } from "react";
import { PessoaFisica } from "../switch-tabs/person";
import { Funcionario } from "../switch-tabs/employee";
import { Address } from "../switch-tabs/address";
import { Contact } from "../switch-tabs/contact";
import { Bank } from "../switch-tabs/bank";
import { Clothing } from "../switch-tabs/clothing";

export default function ContractForm({ mode, isEditable = true }) {
  // State to manage the currently selected tab index.
  const [selectedTab, setSelectedTab] = useState(0);
  // State to store the form data for each tab. Using a Record for flexibility.
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [error] = useState<string | null>(null);

  // Define the tabs with their respective components and keys.
  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, key: "pessoaFisica" },
    { name: "FUNCIONÁRIO", component: Funcionario, key: "funcionario" },
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
              // Pass the current form data to the child component for controlled inputs.
              data={formData[currentKey] || {}}
              onChange={handleInputChange}
              isEditable={isEditable}
              mode={mode}
              onNext={handleNextTab}
              onPrev={handlePrevTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
