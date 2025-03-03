'use client'

import UserCreationForm from '@/app/components/display/user-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { UserService } from '@/app/services/userService'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import './style.css'

export default function Contract() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'create'
  const userId = searchParams.get('id')

  const [userData, setUserData] = useState(null)
  const isEditMode = mode === 'edit'

  // Carregar os dados do usuário se for modo edição
  useEffect(() => {
    if (isEditMode && userId) {
      UserService.getUserById(Number(userId))
        .then(setUserData)
        .catch((err) => {
          console.error('Erro ao carregar usuário:', err)
        })
    }
  }, [isEditMode, userId])

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))',
      }}
    >
      <Navigation />

      {/* Passa userData apenas se for edição */}
      <UserCreationForm mode={mode} isEditable={true} userData={userData} />

      {/* Botão "Voltar" */}
      <div className="absolute left-6 bottom-6 text-white p-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center bg-gray-700">
        <button
          className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push('/user-display/user-list/')}
          aria-label="Voltar para a lista de usuários"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
