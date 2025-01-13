'use client'


import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';

import Image from 'next/image';

import plusButton from '../assets/Mais 1.png'
import cvImage from '../assets/pasta-de-documentos (1) 1.png'


export function VisualizeCV() {


  /* Changing page */ 

  const router = useRouter()
  const changePage = () => {
    router.push('/curriculo-display/')
  }

    return (
      <div >
      {/* Contêiner Principal */}
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
        <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
          <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px]"></div>
          <div style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }} className="bg-[#223E03] w-[87%] h-[80%] rounded-[18px]">
            <form className="max-w-[50%] mx-auto py-20 flex flex-col gap-5 ">
            <div className="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input type="email" placeholder="Search Something..."
          className="w-full outline-none bg-transparent text-gray-600 text-sm" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
      </div>
            <div className="w-full mb-4">
  <h1 className="text-lg font-bold text-white ">Novo curriculo</h1>
</div>
<div className="flex items-center space-x-4">
<div
  onClick={changePage}
  className="w-[80px] h-[90px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-[16px] flex flex-col items-center justify-center shadow-lg hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 transition-all duration-300 cursor-pointer"
>
  {/* Ícone Circular */}
  <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-300"
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

  {/* Texto abaixo do botão */}
  <span className="text-gray-700 text-xs font-medium mt-2 hover:text-gray-900 transition-colors duration-300">
    Adicionar
  </span>
</div>

  </div>
   <div className="flex flex-row gap-80 ">
    <h1 className='px-4'>Curriculo</h1>
    <h1 className='px-[35%]'>Quantidade</h1>
   </div>
   {/* Contêiner com Scroll Automático */}
   <div
      className="overflow-y-auto  border-t border-white"
      style={{
        maxHeight: "240px", // Altura máxima
      }}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="flex flex-row justify-between items-center py-3 px-4">
          <h1 className="text-white">Curriculo{index + 1}</h1>
         <button> <Image alt='' src={cvImage}/> </button>
        </div>
      ))}
    </div>
  </form>

          </div>
        </div>
      </div>
    </div>
  )
}
