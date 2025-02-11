"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cvSchema, CvService } from "@/app/schemas/cvSchema";
import { z } from "zod";
import { useEffect } from "react";

import DropdownCheckboxRegional from "../DropDown/dropdown-regional";
import DropdownCheckboxSchool from "../DropDown/dropdown-school";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";
import { CpfMask } from "../masks/cpf";
import CepMask from "../masks/cep";
import BirthDayMask from "../masks/birthday";
import { PhoneMask } from "../masks/phone";
import { CvFormProps } from "@/app/schemas/cvSchema";

function CvForm({ mode, curriculoData }: CvFormProps) {
  const router = useRouter();

  // Estado do formulário com fallback para valores vazios
  const [formData, setFormData] = useState<z.infer<typeof cvSchema>>(
    curriculoData || {} as z.infer<typeof cvSchema>
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null); // Mantido e usado corretamente
  const [loading] = useState<boolean>(false);


  // Atualiza os campos do formulário e faz a validação instantânea
  const handleChange = useCallback(<K extends keyof z.infer<typeof cvSchema>>(key: K, value: z.infer<typeof cvSchema>[K]) => {
    const updatedData = { ...formData, [key]: value };

    try {
      cvSchema.parse(updatedData); // Validação
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    }

    setFormData(updatedData);
  }, [formData]);

  // Upload do arquivo PDF
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Por favor, selecione um arquivo PDF válido.");
    }
  };

  // Salvar currículo (POST ou PUT)
  const handleSave = async () => {
    try {
      if (!file) {
        alert("Por favor, selecione um arquivo.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      await CvService.uploadCvFile(formDataToSend);
      alert("✅ Currículo enviado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao salvar currículo:", error);
    }
  };
  useEffect(() => {
    if (file) {
      console.log("Arquivo selecionado:", file.name);
    }
  }, [file]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-6 bg-gray-800 shadow-md rounded-lg border">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          {mode === "edit" ? "Editar Currículo" : "Novo Currículo"}
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

          {/* Upload do Arquivo PDF */}
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

          {/* Campos do Formulário */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { key: "full_name", placeholder: "Nome Completo", type: "text" },
              { key: "email", placeholder: "E-mail", type: "email" },
            ].map(({ key, placeholder, type }) => (
              <div key={key}>
                <input
                  type={type}
                  value={formData[key as keyof z.infer<typeof cvSchema>] || ""}
                  onChange={(e) => handleChange(key as keyof z.infer<typeof cvSchema>, e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2 border ${errors[key] ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50`}
                />
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            <BirthDayMask value={formData.date_of_birth || ""} onChange={(value) => handleChange("date_of_birth", value)} />
            <CepMask value={formData.zip_code || ""} onChange={(value) => handleChange("zip_code", value)} />
            <CpfMask value={formData.tax_id || ""} onChange={(value) => handleChange("tax_id", value)} />
            <PhoneMask value={formData.phone || ""} onChange={(value) => handleChange("phone", value)} />

            <DropdownCheckboxPosition value={formData.position || ""} onChange={(value) => handleChange("position", value)} />
            <DropdownCheckboxRegional value={formData.region || ""} onChange={(value) => handleChange("region", value)} />
            <DropdownCheckboxSchool value={formData.scholarity || ""} onChange={(value) => handleChange("scholarity", value)} />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/curriculo-display/visualize-cv")}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Currículo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CvForm;
