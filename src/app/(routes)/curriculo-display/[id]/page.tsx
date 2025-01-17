'use client';

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCurriculoContext } from '@/app/context/CurriculoContext';

import DropdownCheckbox from '@/app/components/DropDown/dropdown-cargo';
import DropdownCheckboxRegional from "@/app/components/DropDown/dropdown-regional";
import { DropdownCheckboxSchool } from "@/app/components/DropDown/dropdown-school";

import { CpfMask } from "@/app/components/masks/cpf";
import CepMask from "@/app/components/masks/cep";
import BirthDayMask from "@/app/components/masks/birthday";
import { PhoneMask } from "@/app/components/masks/phone";

function EditCurriculo() {
  const { curriculos, updateCurriculo } = useCurriculoContext();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [regional, setRegional] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
  if (!id) return;

  const curriculo = curriculos.find((c) => c.id === id);
  if (curriculo) {
    setNome(curriculo.nome);
    setEmail(curriculo.email);
    setCep(curriculo.cep || '');
    setCpf(curriculo.cpf || '');
    setDataNascimento(curriculo.dataNascimento || ''); // Certifique-se de que este campo está no contexto
    setTelefone(curriculo.telefone || '');
    setCargo(curriculo.cargo || '');
    setRegional(curriculo.regional || '');
    setEscolaridade(curriculo.escolaridade || '');
  } else {
    alert('Currículo não encontrado!');
    router.push('/curriculo-display/visualize-cv');
  }
}, [id, curriculos, router]);


const handleSave = () => {
  if (!nome.trim() || !email.trim()) {
    alert("Por favor, preencha os campos obrigatórios.");
    return;
  }

  if (!id || typeof id !== "string") {
    alert("ID inválido.");
    return;
  }

  const updatedCurriculo = {
    id,
    nome,
    email,
    cep,
    cpf,
    telefone,
    cargo,
    regional,
    escolaridade,
    dataNascimento,
    pdf: pdfFile ? URL.createObjectURL(pdfFile) : "", // Use the uploaded file or keep it empty
  };

  updateCurriculo(updatedCurriculo);

  router.push("/curriculo-display/visualize-cv");
};


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/msword') {
        setPdfFile(file);
      } else {
        alert('Por favor, selecione um arquivo PDF ou Word válido.');
      }
    }
  };

  return (
    <div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
        <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
          <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px]"></div>
          <div
            style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }}
            className="bg-[#223E03] w-[87%] h-[80%] rounded-[18px]"
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="max-w-[50%] mx-auto py-20 flex flex-col gap-5 position relative bottom-[10%] right-[20%]"
            >
              <div className="w-full mb-4">
                <h1 className="text-lg font-bold text-white ">Editar currículo</h1>
              </div>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-4 p-2 rounded-lg bg-[#D9D9D9] shadow-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 transition-all duration-300 cursor-pointer"
                >
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
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>

              <BirthDayMask  value={dataNascimento}
    onChange={(value) => setDataNascimento(value)}   />

              <div className="w-full">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
              <div className="flex gap-4 w-full">
                <CepMask value={cep} onChange={(value) => setCep(value)} />
                <CpfMask value={cpf} onChange={(value) => setCpf(value)} />
              </div>

              <div className="w-full">
                <PhoneMask value={telefone} onChange={(value) => setTelefone(value)} />
              </div>
              <div className="w-full flex gap-4">
                <DropdownCheckbox value={cargo} onChange={setCargo} />
                <DropdownCheckboxRegional value={regional} onChange={setRegional} />
              </div>
              <div className="mt-6">
                <DropdownCheckboxSchool value={escolaridade} onChange={setEscolaridade} />
              </div>

              <div className="w-full flex justify-end absolute left-[30%] top-[82%]">
                <button
                  onClick={handleSave}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:via-green-500 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg transition-transform transform hover:scale-105"
                >
                  <span className="relative px-6 py-2 transition-all ease-in duration-75 bg-gray-800 rounded-md group-hover:bg-opacity-0">
                    Salvar
                  </span>
                </button>
                <button
                  onClick={() => router.push('/curriculo-display/visualize-cv')}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-400 hover:via-red-500 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg transition-transform transform hover:scale-105"
                >
                  <span className="relative px-6 py-2 transition-all ease-in duration-75 bg-gray-800 rounded-md group-hover:bg-opacity-0">
                    Cancelar
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCurriculo;
