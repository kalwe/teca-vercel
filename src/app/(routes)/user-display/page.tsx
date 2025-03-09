'use client'

import ComebackButton from '@/app/components/button/comeback'
import UserCreationForm from '@/app/components/display/user-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { UserService } from '@/app/services/userService'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import './style.css'

export default function Contract() {
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
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))'
      }}
    >
      <Navigation />

      {/* Passa userData apenas se for edição */}
      <UserCreationForm mode={mode} isEditable={true} userData={userData} />
      <ComebackButton />
    </div>
  )
}
