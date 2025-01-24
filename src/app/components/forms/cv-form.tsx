"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DropdownCheckbox from "@/app/components/DropDown/dropdown-cargo";
import DropdownCheckboxRegional from "../DropDown/dropdown-regional";

import { useRouter } from "next/navigation";

import { CpfMask } from "../masks/cpf";
import CepMask from "../masks/cep";
import BirthDayMask from "../masks/birthday";
import { PhoneMask } from "../masks/phone";
import { emailSchema } from "@/app/schemas/common/emailSchema";

function CvForm({
  mode,
  curriculoData,
  onSave,
  onCancel,
}: {
  mode: "edit" | "create";
  curriculoData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = useState(curriculoData?.nome || "");
  const [email, setEmail] = useState(curriculoData?.email || "");
  const [cep, setCep] = useState(curriculoData?.cep || "");
  const [cpf, setCpf] = useState(curriculoData?.cpf || "");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [phone, setPhone] = useState(curriculoData?.telefone || "");
  const [selectedRegional, setSelectedRegional] = useState(
    curriculoData?.regional || ""
  );
  const [selectedSchool, setSelectedSchool] = useState(
    curriculoData?.escolaridade || ""
  );
  const [dataNascimento, setDataNascimento] = useState(
    curriculoData?.dataNascimento || ""
  );
  const router = useRouter();

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSave = () => {
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

    const updatedData = {
      ...curriculoData,
      nome,
      email,
      cep,
      cpf,
      telefone: phone,
      regional: selectedRegional,
      escolaridade: selectedSchool,
      dataNascimento,
    };

    onSave(updatedData);
    router.push("/curriculo-display/visualize-cv");
  };

  const handleCancel = () => {
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-6 bg-gray-800 shadow-md rounded-lg border">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          {mode === "edit" ? "Editar Currículo" : "Novo Currículo"}
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-300"
            />
            <BirthDayMask value={dataNascimento} onChange={setDataNascimento} />
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
            <CepMask value={cep} onChange={setCep} />
            <CpfMask value={cpf} onChange={setCpf} />
            <PhoneMask value={phone} onChange={setPhone} />
            <DropdownCheckbox value={selectedRegional} onChange={setSelectedRegional} />
            <DropdownCheckboxRegional
              value={selectedSchool}
              onChange={setSelectedSchool}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition-transform transform hover:scale-105"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500 transition-transform transform hover:scale-105 ml-4"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CvForm;
