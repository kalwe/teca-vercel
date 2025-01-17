'use client'

import { useState, useRef} from 'react'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import { useVagasContext } from '@/app/context/VagasContext';


function VagasForm() {

  const { vagas } = useVagasContext();

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
    router.push('vagas-display/nova-vaga')
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
      <h1 className="text-4xl font-extrabold text-white relative right-[40%]">Vagas</h1>
      <div
        onClick={changePage}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 relative left-[40%] rounded-lg shadow-md hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 transition-all duration-300 cursor-pointer"
      >
        <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors duration-300"
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
        <span className="text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors duration-300 ">
          Adicionar
        </span>
      </div>
    </div>

    {/* Barra de Pesquisa */}
    <div className="flex relative  items-center justify-center mb-2"
    style={{ transform: "translateY(-200%)" }}
    >
      <div className="relative flex items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar vaga..."
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
        <h1 className="text-gray-300 font-semibold">Vaga</h1>
        <h1 className="text-gray-300 font-semibold">Quantidade</h1>
      </div>

      {/* Contêiner com Scroll Automático */}

{/* Lista de Vagas */}
<div
  className="overflow-y-auto rounded-lg"
  style={{
    maxHeight: "303px",
  }}
>
  {vagas.length > 0 ? (
    vagas.map((vaga, index) => (
      <div
      key={index}
      onClick={() => router.push(`/vagas-display/nova-vaga?index=${index}`)}
        className="flex justify-between items-center p-2 bg-gray-800 rounded-md mb-2 cursor-pointer hover:bg-gray-700"
      >
        <span className="text-gray-300 font-medium">{vaga.vaga}</span>
        <span className="text-gray-300 font-medium">{vaga.quantidade}</span>
      </div>
    ))
  ) : (
    <p className="text-gray-300">Nenhuma vaga adicionada ainda.</p>
  )}
</div>


    </div>

  </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default VagasForm