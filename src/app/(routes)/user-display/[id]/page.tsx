import UserForm from '@/app/components/display/user-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function UserDetailPage() {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-white text-lg font-semibold'>
          Carregando usuário...
        </p>
      </div>
    )
  }

  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      {userData && <UserForm mode='edit' isEditable={true} userData={userData} />}
    </div>
  )
}
