"use client"

import HoursBank from '@/app/components/forms/hoursbank-form';
import '../style.css'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { DropDownBurger } from '@/app/components/DropDown/dropdown-burger';
import { Navigation } from '@/app/components/navigation/navigation';
import Employees from '@/app/components/forms/registered-employees';


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


            {/* Botão "Voltar" */}
<div
  style={{
    backgroundColor: "#D9D9D963",
    zIndex: 6,
  }}
  className="absolute right-[88%] bottom-[70%] text-white p-4 rounded-[21px] h-[12%] shadow-md transition-all duration-300 transform hover:scale-105  flex items-center justify-center"
>
  {/* Ícone Circular */}
  <button
    className="w-[30px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
    onClick={handleClick}
  >
    {/* Ícone de seta para voltar */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
</div>

    </div>
  );
}
