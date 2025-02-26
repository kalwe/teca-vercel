"use client"

import { useState } from "react"
import { PessoaFisica } from "../switch-tabs/person"
import { Funcionario } from "../switch-tabs/employee"
import { Address } from "../switch-tabs/address"
import { Contact } from "../switch-tabs/Contact"
import { Bank } from "../switch-tabs/bank"
import { Clothing } from "../switch-tabs/clothing"
import { EmployeeService } from "@/app/services/employeeService"
import { useRouter } from "next/navigation"

export default function ContractForm({employeeData = {}, isEditable = true }) {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    pessoaFisica: employeeData?.pessoaFisica ?? {},
    funcionario: employeeData?.funcionario ?? {},
    address: employeeData?.address ?? {},
    contact: employeeData?.contact ?? {},
    bankAccount: employeeData?.bank_account ?? {},
    clothing: employeeData?.clothing ?? {},
  })

  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, key: "pessoaFisica" },
    { name: "FUNCIONÁRIO", component: Funcionario, key: "funcionario" },
    { name: "ENDEREÇO", component: Address, key: "address" },
    { name: "CONTATO", component: Contact, key: "contact" },
    { name: "DADOS BANCÁRIOS", component: Bank, key: "bankAccount" },
    { name: "VESTUÁRIO", component: Clothing, key: "clothing" },
  ]

  const CurrentComponent = tabs[selectedTab].component
  const currentKey = tabs[selectedTab].key

  const handleInputChange = (data: Record<string, unknown>) => {
    setFormData((prev) => ({
      ...prev,
      [currentKey]: { ...prev[currentKey], ...data },
    }))
  }

  const handleNextTab = () => setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))

  const handlePrevTab = () => setSelectedTab((prev) => Math.max(prev - 1, 0))

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    // Lista de campos obrigatórios
    const requiredFields = {
      camisa: formData.camisa,
      calca: formData.calca,
      calcado: formData.calcado,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value) // Filtra os campos vazios
      .map(([key]) => key); // Retorna os nomes dos campos faltando

    if (missingFields.length > 0) {
      setError(`Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    try {
      console.log("Enviando os seguintes dados:", JSON.stringify(formData, null, 2));

      await EmployeeService.createEmployee(formData);
      router.push("/contract-display/employee-list");
    } catch (err) {
      console.error("Erro ao salvar funcionário:", err);
      setError("Erro ao salvar funcionário. Tente novamente.");
    } finally {
      setLoading(false);
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
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <CurrentComponent
              data={formData[currentKey]}
              onChange={handleInputChange}
              isEditable={isEditable}
              mode={mode}
              onNext={handleNextTab}
              onPrev={handlePrevTab}
            />

            {/* Botões */}
            <div className="flex justify-between mt-4">
              {selectedTab > 0 && (
                <button
                  onClick={handlePrevTab}
                  className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                >
                  Voltar
                </button>
              )}
              {selectedTab < tabs.length - 1 ? (
                <button
                  onClick={handleNextTab}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
