"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cvSchema, CvService } from "@/app/schemas/cvSchema"; // Importando cvSchema para validação


import DropdownCheckboxRegional from "../DropDown/dropdown-regional";
import DropdownCheckboxSchool from "../DropDown/dropdown-school";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";
import { CpfMask } from "../masks/cpf";
import CepMask from "../masks/cep";
import BirthDayMask from "../masks/birthday";
import { PhoneMask } from "../masks/phone";
import {z} from 'zod'

import { CvFormProps } from "@/app/types/cv"; // Importando tipo CvFormProps

function CvForm({ mode, curriculoData }: CvFormProps) {
  const router = useRouter();

  // Estado do formulário
  const [formData, setFormData] = useState<z.infer<typeof cvSchema>>(
    curriculoData ? cvSchema.parse(curriculoData) : cvSchema.parse({})
  );

  const [positions, setPositions] = useState<string[]>([]); // Estado para armazenar opções do dropdown
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔥 Busca cargos da API ao montar o componente
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await CvService.getAllCvs(); // Buscar cargos com CvService, ajustado para um exemplo real
        setPositions(data.map((item) => item.position)); // Ajustar para o tipo correto
      } catch (error) {
        console.error("Erro ao buscar cargos:", error);
      }
    };
    fetchPositions();
  }, []);

  // Atualiza formData se curriculoData mudar
  useEffect(() => {
    if (curriculoData) setFormData(cvSchema.parse(curriculoData));
  }, [curriculoData]);

  // Atualiza valores do formulário de forma otimizada
  const handleChange = useCallback((key: keyof z.infer<typeof cvSchema>, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  }, []);

  // Upload de arquivo PDF
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const uploadedFile = event.target.files[0];
      if (uploadedFile.type === "application/pdf") {
        setFile(uploadedFile);
        handleChange("pdf_url", URL.createObjectURL(uploadedFile));
      } else {
        alert("Por favor, selecione um arquivo PDF válido.");
      }
    }
  };

  // Valida o formulário
  const validateForm = useCallback((): boolean => {
    try {
      cvSchema.parse(formData); // Valida o formData com o cvSchema
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error: { path: string | any[]; message: string; }) => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [formData]);

  // Salva os dados (POST ou PUT)
  const handleSave = async () => {
    if (!validateForm()) {
      alert("Erro na validação. Verifique os campos.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "create") {
        await CvService.createCv(formData); // POST na API
      } else {
        await CvService.updateCv(formData.id, formData); // PUT na API
      }
      alert("Currículo salvo com sucesso!");
      router.push("/curriculo-display/visualize-cv");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar o currículo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-6 bg-gray-800 shadow-md rounded-lg border">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          {mode === "edit" ? "Editar Currículo" : "Novo Currículo"}
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* PDF Upload */}
          <div>
            <label
              htmlFor="file-upload"
              className="flex items-center gap-4 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span>Insira currículo (PDF)</span>
              <input id="file-upload" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Campos de Input */}
            {[
              { key: "full_name", placeholder: "Nome Completo", type: "text" },
              { key: "email", placeholder: "E-mail", type: "email" },
            ].map(({ key, placeholder, type }) => (
              <div key={key}>
                <input
                  type={type}
                  value={formData[key as keyof z.infer<typeof cvSchema>]}
                  onChange={(e) => handleChange(key as keyof z.infer<typeof cvSchema>, e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2 border ${errors[key] ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50`}
                />
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            {/* Componentes de Máscara */}
            <BirthDayMask value={formData.date_of_birth} onChange={(value) => handleChange("date_of_birth", value)} />
            <CepMask value={formData.zip_code} onChange={(value) => handleChange("zip_code", value)} />
            <CpfMask value={formData.tax_id} onChange={(value) => handleChange("tax_id", value)} />
            <PhoneMask value={formData.phone} onChange={(value) => handleChange("phone", value)} />

            {/* Dropdowns puxando da API */}
            <DropdownCheckboxPosition value={formData.position} onChange={(value) => handleChange("position", value)} options={positions} />
            <DropdownCheckboxRegional value={formData.region} onChange={(value) => handleChange("region", value)} />
            <DropdownCheckboxSchool value={formData.scholarity} onChange={(value) => handleChange("scholarity", value)} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CvForm;
