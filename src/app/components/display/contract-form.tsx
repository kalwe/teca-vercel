'use client'

import { ContractFormProps, Employee } from '@/app/types/employee'
import { useEffect, useState } from 'react'
import { Address } from '../switch-tabs/Address'
import { Bank } from '../switch-tabs/Bank'
import { Clothing } from '../switch-tabs/Clothing'
import { Contact } from '../switch-tabs/Contact'
import { EmployeeForm } from '../switch-tabs/Employee'

export default function ContractForm({ data }: ContractFormProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)
  const [employee, setEmployee] = useState<Employee>({})

  useEffect(() => {
    if (data) {
      setEmployee(data)
    }
    setLoading(false)
  }, [data])

  const tabs = [
    // { name: 'PESSOA FÍSICA', component: PessoaFisica, key: 'employee' },
    { name: 'FUNCIONÁRIO', component: EmployeeForm, key: 'employee' },
    { name: 'ENDEREÇO', component: Address, key: 'address' },
    { name: 'CONTATO', component: Contact, key: 'contact' },
    { name: 'DADOS BANCÁRIOS', component: Bank, key: 'bankAccount' },
    { name: 'VESTUÁRIO', component: Clothing, key: 'clothing' }
  ]

  const CurrentComponent = tabs[selectedTab].component

  const handleNextTab = () => {
    setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))
  }

  const handlePrevTab = () => {
    setSelectedTab((prev) => Math.max(prev - 1, 0))
  }

  // const onChange = () => {
  //
  // }

  return (
    <>
      <div className='flex items-center justify-center min-h-screen p-24'>
        <div className='w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
          <div className='flex flex-col md:flex-row'>
            {/* Sidebar Menu */}
            <div className='w-full md:w-1/4 bg-gray-900 text-white'>
              <div className='flex flex-col space-y-2 p-4'>
                {tabs.map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(index)}
                    className={`py-2 px-4 rounded-lg transition-all duration-200 ${
                      selectedTab === index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-green-400 hover:text-white'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className='w-full md:w-3/4 p-6'>
              {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
              <CurrentComponent
                data={employee?.[tabs[selectedTab].key as keyof Employee] ?? null}
                onNext={handleNextTab}
                onPrev={handlePrevTab}
                employeeId={employee?.id}
              />
              {loading && <p className='text-white text-sm mt-2'>Salvando...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
