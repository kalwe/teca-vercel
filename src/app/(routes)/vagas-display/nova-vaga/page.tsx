'use client'

import { useState, useRef, useEffect, SetStateAction } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import "react-datepicker/dist/react-datepicker.css";

import { DropDownBurger } from "@/app/components/DropDown/dropdown-burger";

import '../style.css'

import DropdownCheckbox from '@/app/components/DropDown/dropdown-cargo';

import { QuantityMask } from '@/app/components/masks/quantity';
import MoneyInput from '@/app/components/masks/salary';

import { useVagasContext } from '@/app/context/VagasContext';

function NovaVaga() {

  // Modal states for each field
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);


  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [salario, setSalario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargo, setCargo] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const searchParams = useSearchParams();
  const { vagas, updateVaga, addVaga } = useVagasContext();
  const index = searchParams.get("index");
  const isEditMode = index !== null;


  useEffect(() => {
    if (isEditMode) {
      const vaga = vagas[Number(index)];
      if (vaga) {
        setCargo(vaga.cargo);
        setQuantidade(vaga.quantidade);
        setDescricao(vaga.descricao);
        setRequisitos(vaga.requisitos);
        setBeneficios(vaga.beneficios);
        setSalario(vaga.salario);
      }
    }
  }, [index, isEditMode, vagas]);


  const handleSave = () => {
    // Validate required fields
    if (!cargo || quantidade <= 0) {
      alert("Por favor, preencha o cargo e a quantidade.");
      return;
    }

    const newOrUpdatedVaga = {
      vaga: cargo,
      quantidade,
      cargo,
      descricao,
      requisitos,
      beneficios,
      salario,
    };

    // Check if in edit mode
    if (isEditMode) {
      // Update existing vaga
      updateVaga(Number(index), newOrUpdatedVaga);
      alert("Vaga atualizada com sucesso.");
    } else {
      // Check for duplicate cargo
      const exists = vagas.some((vaga) => vaga.cargo === cargo);
      if (exists) {
        alert(`O cargo "${cargo}" já existe. Por favor, escolha outro.`);
        return;
      }

      // Add new vaga
      addVaga(newOrUpdatedVaga);
      alert("Nova vaga adicionada com sucesso.");
    }

    // Redirect to vagas-display page
    router.push("/vagas-display/");
  };


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
  const handleDescriptionSave = () => {
    setShowDescriptionModal(false);
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
                <h1 className="text-lg font-bold text-white">{isEditMode ? "Editar Vaga" : "Nova Vaga"}</h1>
              </div>
              <div className="w-full flex gap-4">
                <div className="flex-1 flex gap-4">
                <div className="flex-1">
                <DropdownCheckbox
        value={cargo}
        onChange={setCargo}
        disabled={isEditMode} // Disable dropdown in edit mode
        options={["Cargo1", "Cargo2", "Cargo3", "Cargo4"]} // Dynamic options
      />
      <p>Cargo selecionado: {cargo}</p>
</div>

                    <div className="flex-1">
                        <QuantityMask
                        value={quantidade}
                        onChange={(newQuantity: number) => setQuantidade(newQuantity)}
                        />
                    </div>
                </div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Descrição"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
                  onClick={() => setShowDescriptionModal(true)}

                  readOnly
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Requisitos"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white cursor-pointer"
                  onClick={() => setShowRequirementsModal(true)}
                  value={requisitos}
                   onChange={(e) => setRequisitos(e.target.value)}
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
                  value={beneficios}
                  onChange={(e) => setBeneficios(e.target.value)}
                  readOnly
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
             < MoneyInput
               value={salario} // Pass the state variable
               onChange={(newValue) => setSalario(newValue)}
             />

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
          onClick={() => setShowDescriptionModal(false)}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="button"
          onClick={() => {
            setDescricao(description); // Update the main form state
            setShowDescriptionModal(false); // Close the modal
          }}
        >
          {isEditMode ? "Salvar Alterações" : "Salvar"}
        </button>
      </div>
    </div>
  </div>
)}{/* Requisitos */}
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
          onClick={() => setShowRequirementsModal(false)}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setRequisitos(requirements); // Update the main form state
            setShowRequirementsModal(false); // Close the modal
          }}
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
          onClick={() => setShowBenefitsModal(false)}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setBeneficios(benefits); // Update the main form state
            setShowBenefitsModal(false); // Close the modal
          }}
        >
          {isEditMode ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </div>
  </div>
)}

             <div className="w-full flex justify-end absolute left-[20%] top-[84%]">
             <button
  onClick={handleSave}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  {isEditMode ? "Atualizar Vaga" : "Salvar Nova Vaga"}
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
