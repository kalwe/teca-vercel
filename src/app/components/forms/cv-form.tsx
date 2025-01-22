"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCurriculoContext } from "@/app/context/CurriculoContext";

import DropdownCheckbox from "@/app/components/DropDown/dropdown-cargo";
import DropdownCheckboxRegional from "../DropDown/dropdown-regional";
import { DropdownCheckboxSchool } from "../DropDown/dropdown-school";

import { CpfMask } from "../masks/cpf";
import CepMask from "../masks/cep";
import BirthDayMask from "../masks/birthday";
import { PhoneMask } from "../masks/phone";
import { emailSchema } from "@/app/schemas/common/emailSchema";

function CvForm() {
  const router = useRouter();
  const { addCurriculo } = useCurriculoContext();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [cpf, setCpf] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [selectedRegional, setSelectedRegional] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  // Estados de erro
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleFinalize = () => {
    if (!nome.trim()) {
      alert("Por favor, insira o nome completo.");
      return;
    }

    try {
      emailSchema.parse(email);
      setEmailError(null);
    } catch (err: any) {
      setEmailError(err.errors[0].message);
      return;
    }

    if (!pdfFile) {
      alert("Por favor, selecione um arquivo de currículo.");
      return;
    }

    const fileURL = URL.createObjectURL(pdfFile);

    addCurriculo({
      id: Date.now().toString(),
      nome,
      email,
      cep,
      cpf,
      pdf: fileURL,
      telefone: phone,
      cargo: "",
      regional: selectedRegional,
      escolaridade: selectedSchool,
      dataNascimento,
    });

    setNome("");
    setEmail("");
    setCep("");
    setCpf("");
    setPhone("");
    setSelectedRegional("");
    setSelectedSchool("");
    setDataNascimento("");
    setPdfFile(null);

    router.push("/curriculo-display/visualize-cv");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setPdfFile(file);
      } else {
        alert("Por favor, selecione um arquivo PDF válido.");
      }
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    try {
      emailSchema.parse(value);
      setEmailError(null);
    } catch (err: any) {
      setEmailError(err.errors[0].message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  "
    style={{
      background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))"
    }}
    >
      <div className="w-full max-w-4xl p-6 bg-gray-800 shadow-md rounded-lg border relative top-[30px]">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Novo Currículo</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6"
        >
          <div>

            <label
              htmlFor="file-upload"
              className="flex items-center gap-4 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
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
              <span>Insira currículo (PDF, DOC)</span>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome completo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-300"
              />
            </div>

            <div>

              <BirthDayMask value={dataNascimento} onChange={setDataNascimento} />
            </div>

            <div>

              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Digite o e-mail"
                className={`w-full px-4 py-2 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 focus:ring-2 ${
                  emailError ? "focus:ring-red-500" : "focus:ring-green-300"
                }`}
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>

            <div>

              <CepMask value={cep} onChange={setCep} />
            </div>

            <div>

              <CpfMask value={cpf} onChange={setCpf} />
            </div>

            <div>

              <PhoneMask value={phone} onChange={setPhone} />
            </div>

            <div>

              <DropdownCheckbox onChange={(value) => console.log(value)} />
            </div>

            <div>

              <DropdownCheckboxRegional
                value={selectedRegional}
                onChange={setSelectedRegional}
              />
            </div>

            <div>
              <label className="block text-white font-medium">Escolaridade</label>
              <DropdownCheckboxSchool
                value={selectedSchool}
                onChange={setSelectedSchool}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleFinalize}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition-transform transform hover:scale-105"
            >
              Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CvForm;
