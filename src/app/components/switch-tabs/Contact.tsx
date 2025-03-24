'use client'

import { ContactService } from '@/app/services/contactService'
import { SwitchTabsComponentProps } from '@/app/types/base'
import { useEffect, useState } from 'react'

export function Contact({ data, onNext, onPrev, employeeId }: SwitchTabsComponentProps) {
  const [contact, setContact] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: any, value: any) => {
    const contactInput = { ...contact, [field]: value }
    setContact(contactInput)
  }
  useEffect(() => {
    const fetchContact = () => {
      setContact(data)
      setLoading(false)
    }
    if (data) {
      setLoading(true)
      fetchContact()
    }
  }, [data])

  const handleSave = async () => {
    try {
      setLoading(true)
      if (employeeId) {
        const { id, ...contactUpdate } = contact
        await ContactService.updateContact(Number(id), {
          ...contactUpdate,
          employeeId: Number(employeeId)
        })
      } else {
        const employeeId = localStorage.getItem('createdEmployeeId')
        await ContactService.createContact({
          ...contact,
          employeeId: Number(employeeId)
        })
      }
      alert('Contato salvo com sucesso!')
      onNext()
    } catch (error) {
      console.error('Erro ao salvar contato:', error)
      alert('Erro ao salvar contato. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full'>
      <h2 className='text-white text-xl font-bold'>Contato</h2>

      {[
        { name: 'phone', placeholder: 'Digite o número de telefone', label: 'Telefone' },
        { name: 'email', placeholder: 'Digite o e-mail', label: 'E-mail' },
        { name: 'webSite', placeholder: 'Digite o website', label: 'Website' }
      ].map((field) => (
        <div key={field.name} className='w-full'>
          <input
            type='text'
            name={field.name}
            value={contact?.[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3'
          />
        </div>
      ))}

      <div className='flex justify-between mt-6'>
        <button
          onClick={onPrev}
          className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
        >
          Voltar
        </button>
        <button
          onClick={handleSave}
          className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </button>
      </div>
    </div>
  )
}
