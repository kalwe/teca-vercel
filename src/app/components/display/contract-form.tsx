"use client"

import { useState } from "react"
import { PessoaFisica } from "../switch-tabs/person"
import { Funcionario } from "../switch-tabs/employee"
import { Address } from "../switch-tabs/address"
import { Contact } from "../switch-tabs/Contact"
import { Bank } from "../switch-tabs/bank"
import { Clothing } from "../switch-tabs/clothing"

// TODO: verificar em:
//    /app/(routes)/contract-display/page.tsx
//    /app/(routes)/contract-display/[id]/page.tsx
//  os parametros que estao sendo passados
//  pois esta definido um objeto {} do tipo ContractFormProps, porem esta faltando onSave, onCancel
export default function ContractForm(mode, employeeData, onSave, onCancel, isEditable) {
  const [selectedTab, setSelectedTab] = useState(0)

  const [pessoaFisica, setPessoaFisica] = useState(employeeData?.pessoaFisica ?? {})
  const [funcionario, setFuncionario] = useState(employeeData?.funcionario ?? {})
  const [address, setAddress] = useState(employeeData?.address ?? {})
  const [contact, setContact] = useState(employeeData?.contact ?? {})
  const [bankAccount, setBankAccount] = useState(employeeData?.bank_account ?? {})
  const [clothing, setClothing] = useState(employeeData?.clothing ?? {})

  const tabs = [
    // TODO: ajustar pessoaFisica e funcionario tudo dentro de employee
    { name: "PESSOA FÍSICA", component: PessoaFisica, state: pessoaFisica, setState: setPessoaFisica },
    { name: "FUNCIONÁRIO", component: Funcionario, state: funcionario, setState: setFuncionario },
    { name: "ENDEREÇO", component: Address, state: address, setState: setAddress },
    { name: "CONTATO", component: Contact, state: contact, setState: setContact },
    { name: "DADOS BANCÁRIOS", component: Bank, state: bankAccount, setState: setBankAccount },
    { name: "VESTUÁRIO", component: Clothing, state: clothing, setState: setClothing },
  ]

  const CurrentComponent = tabs[selectedTab]?.component as React.ElementType
  const currentState = tabs[selectedTab]?.state

  const handleInputChange = (data: Record<string, unknown>) => {
    switch (selectedTab) {
      case 0:
        setPessoaFisica((prev) => ({ ...prev, ...data }))
        break
      case 1:
        setFuncionario((prev) => ({ ...prev, ...data }))
        break
      case 2:
        setAddress((prev) => ({ ...prev, ...data }))
        break
      case 3:
        setContact((prev) => ({ ...prev, ...data }))
        break
      case 4:
        setBankAccount((prev) => ({ ...prev, ...data }))
        break
      case 5:
        setClothing((prev) => ({ ...prev, ...data }))
        break
      default:
        console.error("Erro: Aba inválida selecionada.")
    }
  }

  const handleNextTab = () => setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))
  const handlePrevTab = () => setSelectedTab((prev) => Math.max(prev - 1, 0))

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
                onNext={handleNextTab}
                onPrev={handlePrevTab}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
