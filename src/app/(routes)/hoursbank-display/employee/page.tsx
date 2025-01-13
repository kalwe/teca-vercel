"use client"

import EmployeeHours from '@/app/components/forms/employeehours-form';
import '../style.css'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { DropDownBurger } from '@/app/components/DropDown/dropdown-burger';
import { Navigation } from '@/app/components/navigation/navigation';

export default function Contract() {
 
  

    /* Change page */

const router = useRouter()

const handleClick = () => {
  router.push('/dashboard-display/')
} 


  return (
    <div>
     <Navigation/>
      <EmployeeHours/>



    </div>
  );
}
