'use client'

import { useState, useRef} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

import DropdownCheckbox from '@/app/components/DropDown/dropdown-cargo'
import DropdownCheckboxRegional from '../DropDown/dropdown-regional'
import { DropdownCheckboxSchool } from '../DropDown/dropdown-school';

import { CpfMask } from '../masks/cpf';
import CepMask from '../masks/cep';
import BirthDayMask from '../masks/birthday';
import { PhoneMask } from '../masks/phone';

import plusButton from '../assets/Mais 1.png'



function CvForm() {



  // come back button

  const router = useRouter();

  const handleClick = () => {
    router.push('/curriculo-display/visualize-cv');
  }



    return (
      <div >
      {/* Contêiner Principal */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
        <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
          <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px]"></div>
          <div style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }} className="bg-[#223E03] w-[87%] h-[80%] rounded-[18px]">
            <form className="max-w-[50%] mx-auto py-20 flex flex-col gap-5 position relative bottom-[10%] right-[20%]">
            <div className="w-full mb-4">
  <h1 className="text-lg font-bold text-white ">Novo currículo</h1>
</div>
<div className="flex items-center space-x-4">
<div
  className="flex items-center gap-4 p-2 rounded-lg bg-[#D9D9D9] shadow-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 transition-all duration-300 cursor-pointer"

>
  {/* Ícone Circular */}
  <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors duration-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v16m8-8H4"
      />
    </svg>
  </div>

  <span className="text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors duration-300">
    Insira currículo
  </span>
</div>

</div>

              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nome completo "
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>


<BirthDayMask/>



              <div className="w-full">
                {/*
                <input
                  type="text"
                  placeholder="Endereço"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                />
                <div className="border-t border-white w-full mt-1"></div> */}

              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
              <div className="flex gap-4 w-full">
  {/* Campo CEP */}

<CepMask value={''} onChange={function (value: string): void {
                    throw new Error('Function not implemented.');
                  } }/>

  {/* Campo CPF */}
 <CpfMask value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                    throw new Error('Function not implemented.');
                  } }/>
</div>

              <div className="w-full">
               <PhoneMask/>

              </div>
              <div className="w-full flex gap-4">
                <div className="flex-1">
                <DropdownCheckbox/>

                </div>
                <div className="flex-1">
             <DropdownCheckboxRegional/>

                </div>
              </div>

              <div className="w-full">
              <div className="w-full flex items-center">

</div>


              </div>
    <DropdownCheckboxSchool/>

              {/* Finalize button */}
              <div className="w-full flex justify-end absolute left-[20%] top-[82%]">
  <button
    onClick={handleClick}
    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:via-green-500 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg transition-transform transform hover:scale-105"
  >
    <span className="relative px-6 py-2 transition-all ease-in duration-75 bg-gray-800 rounded-md group-hover:bg-opacity-0">
      Finalizar
    </span>
  </button>
</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CvForm