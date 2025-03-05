'use client'

import '../style.css'

import ComebackButton from '@/app/components/button/comeback'
import Employees from '@/app/components/display/registered-employees'
import { Navigation } from '@/app/components/navigation/navigation'

export default function Contract() {
  // const handleClick = () => {
  //   router.push('/dashboard-display/')
  // }

  return (
    <div>
      <Navigation />
      <Employees />
      <ComebackButton />
    </div>
  )
}
