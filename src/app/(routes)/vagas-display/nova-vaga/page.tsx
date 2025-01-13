'use client'

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import plusButton from "../assets/Mais 1.png";
import Image from 'next/image';

import { DropDownBurger } from "@/app/components/DropDown/dropdown-burger";

import '../style.css'

import DropdownCheckbox from '@/app/components/DropDown/dropdown-cargo';

import { QuantityMask } from '@/app/components/masks/quantity';
import MoneyInput from '@/app/components/masks/salary';

function NovaVaga() {
  // Calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  // Modal states for each field
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);

  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");

  // comeback button
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/vagas-display/');
  }

  

  // Function to clear the text when cancel is clicked
  const handleCancelDescription = () => {
    setDescription("");
    setShowDescriptionModal(false);
  };

  const handleCancelRequirements = () => {
    setRequirements("");
    setShowRequirementsModal(false);
  };

  const handleCancelBenefits = () => {
    setBenefits("");
    setShowBenefitsModal(false);
  };

     
    //comeback button
    
    const comeback = () => {
      router.push('/dashboard-display/')
    } 

/* burger action */

const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
                              <nav
                                   style={{ backgroundColor: '#53594BCC' }}
                                   className="w-full border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                 >
                                   <div className="flex items-center justify-between px-4 py-3">
                                     <a href="#" className="text-2xl font-semibold whitespace-nowrap text-white">
                                       COIF
                                     </a>
                                      {/* Botão Hamburger */}
                                      <button
                             onClick={toggleMenu}
                             className="fixed top-4 right-4 z-50 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-lg"
                           >
                             <div className="relative w-[20px] h-[20px]">
                               {/* Linha diagonal 1 */}
                               <span
                                 className={`absolute top-1/2 left-1/2 bg-white w-[20px] h-[2px] rounded transform transition-transform duration-300 ${
                                   isMenuOpen
                                     ? "rotate-45 -translate-x-1/2 -translate-y-1/2"
                                     : "-translate-x-1/2 -translate-y-[6px]"
                                 }`}
                               ></span>
                               {/* Linha diagonal 2 */}
                               <span
                                 className={`absolute top-1/2 left-1/2 bg-white w-[20px] h-[2px] rounded transform transition-transform duration-300 ${
                                   isMenuOpen
                                     ? "-rotate-45 -translate-x-1/2 -translate-y-1/2"
                                     : "-translate-x-1/2 translate-y-[6px]"
                                 }`}
                               ></span>
                             </div>
                           </button>
                           
                           
                           
                                   <DropDownBurger isOpen={isMenuOpen}/>
                                   </div>
                                   </nav>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
        <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
          <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px]"></div>
          <div style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }} className="bg-[#7A7A7A] w-[87%] h-[80%] rounded-[18px]">
            <form className="max-w-[50%] mx-auto py-20 flex flex-col gap-5 position relative bottom-[10%] right-[20%]">
              <div className="w-full mb-8 py-8">
                <h1 className="text-lg font-bold text-white">Nova vaga</h1>
              </div>
              <div className="w-full flex gap-4">
                <div className="flex-1 flex gap-4">
                    <div className="flex-1">
                        <DropdownCheckbox />
                    </div>
                    <div className="flex-1">
                        <QuantityMask />
                    </div>
                </div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Descrição"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
                  onClick={() => setShowDescriptionModal(true)}
                  value={description}
                  readOnly
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Requisitos"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
                  onClick={() => setShowRequirementsModal(true)}
                  value={requirements}
                  readOnly
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Benefícios"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
                  onClick={() => setShowBenefitsModal(true)}
                  value={benefits}
                  readOnly
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
             < MoneyInput/>
              
              {/* Descrição da vaga */}
              {showDescriptionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-[40%]">
                    <h2 className="text-lg font-bold mb-4">Descrição</h2>
                    <textarea
                      className="w-full h-80 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descreva aqui..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleCancelDescription}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowDescriptionModal(false)}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Requisitos */}
              {showRequirementsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-[40%]">
                    <h2 className="text-lg font-bold mb-4">Requisitos</h2>
                    <textarea
                      className="w-full h-80 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descreva os requisitos aqui..."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleCancelRequirements}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowRequirementsModal(false)}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefícios */}
              {showBenefitsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-[40%]">
                    <h2 className="text-lg font-bold mb-4">Benefícios</h2>
                    <textarea
                      className="w-full h-80 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descreva os benefícios aqui..."
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleCancelBenefits}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowBenefitsModal(false)}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              )}
             <div className="w-full flex justify-end absolute left-[20%] top-[84%]">
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

export default NovaVaga;
