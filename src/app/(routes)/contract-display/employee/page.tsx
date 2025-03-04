"use client"

import '../style.css'
import { useRouter } from "next/navigation";

import { Navigation } from '@/app/components/navigation/navigation';
import Employees from '@/app/components/display/registered-employees';
import ComebackButton from '@/app/components/button/comeback';


export default function Contract() {

  /* Change page */
  const router = useRouter()

  const handleClick = () => {
    router.push('/dashboard-display/')
  }

  return (
    <div>
      {/* Navbar */}
      <Navigation/>
      <Employees/>
<ComebackButton/>
    </div>
  )
}
