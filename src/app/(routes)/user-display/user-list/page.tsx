'use client'

import UserList from '@/app/components/display/registered-users'
import { Navigation } from '@/app/components/navigation/navigation'
import { useRouter } from 'next/navigation'
import '../style.css'
import ComebackButton from '@/app/components/button/comeback'

export default function Contract() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/dashboard-display/')
  }

  return (
    <div>
      {/* Navbar */}
      <Navigation />
      <UserList />

     <ComebackButton/>
    </div>
  )
}
