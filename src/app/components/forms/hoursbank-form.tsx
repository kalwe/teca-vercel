'use client'

import { useState, useRef} from 'react'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';



function HoursBank() {
  
  /*
  const [cnpj, setCnpj] = useState<string>()
  const handleCnpjMask = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const normalizedValue = normalizeCNPJ(value)
    setCnpj(normalizedValue)
  }
 */

  {/* Calendar */}

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Referência para o componente DatePicker
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Manipulador de clique no ícone para abrir o calendário
  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Abre o calendário
    }
  };

  /* Changing page */ 

  const router = useRouter()
  const changePage = () => {
    router.push('hoursbank-display/employee')
  }

    return (
      <div >
      {/* Contêiner Principal */}
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
        <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
          <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px]"></div>
          <div style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }} className="bg-[#7A7A7A] w-[87%] h-[80%] rounded-[18px]">
            <form className="max-w-[50%] mx-auto py-20 flex flex-col gap-5 ">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
      <h1 className="text-4xl font-extrabold text-white relative right-[40%]">Banco de Horas</h1>
      
    </div>

    {/* Barra de Pesquisa */}
    <div className="flex relative  items-center justify-center mb-2"
    style={{ transform: "translateY(-200%)" }} 
    >
      <div className="relative flex items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar funcionário..."
          className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
    </div>

    {/* Lista de Vagas */}
    <div className="p-8 bg-gray-700 rounded-lg shadow-inner w-[150%]  relative right-[20%] "
    style={{transform: "translateY(-20%)" }}
    >
      {/* Cabeçalho da Tabela */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-8 mb-2">
        <h1 className="text-gray-300 font-semibold">Funcionário</h1>
        <h1 className="text-gray-300 font-semibold">Horas semanais</h1>
      </div>

      {/* Contêiner com Scroll Automático */}
      <div
        className="overflow-y-auto rounded-lg"
        style={{
          maxHeight: "303px",
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 px-4 hover:bg-gray-600 transition-all duration-200"
            onClick={changePage}
          >
            <h1 className="text-white">Funcionário {index + 1}</h1>
            <h1 className="text-white">{index + 1}</h1>
          </div>
        ))}
      </div>
    </div>

  </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default HoursBank