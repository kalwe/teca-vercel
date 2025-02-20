"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { resumeSchema } from "@/app/schemas/cvSchema";
import { ResumeService } from "@/app/services/resumeService";
import { z } from "zod";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import DropdownCheckboxPosition from "../DropDown/dropdown-position";
import { ResumeFormProps } from "@/app/schemas/cvSchema";

function ResumeForm({ mode, curriculoData }: ResumeFormProps) {
  const router = useRouter();

  // Estado do formulário com fallback para valores vazios
  const [formData, setFormData] = useState<z.infer<typeof resumeSchema>>(
    curriculoData || {} as z.infer<typeof resumeSchema>
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [registrationDate, setRegistrationDate] = useState<Date | null>(new Date());

  // Atualiza os campos do formulário e faz a validação instantânea
  const handleChange = useCallback(<K extends keyof z.infer<typeof resumeSchema>>(key: K, value: z.infer<typeof resumeSchema>[K]) => {
    const updatedData = { ...formData, [key]: value };

    try {
      resumeSchema.parse(updatedData);
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

  // Upload de qualquer tipo de arquivo
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (uploadedFile) {
      setFile(uploadedFile);
    } else {
      alert("Por favor, selecione um arquivo válido.");
    }
  };

  // Salvar currículo (POST para a API)
  const handleSave = async () => {
    try {
      setLoading(true);
      if (!file) {
        alert("Por favor, selecione um arquivo.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("registrationDate", registrationDate?.toISOString() || "");

      await ResumeService.uploadResumeFile(formDataToSend);
      alert("✅ Currículo enviado com sucesso!");
      router.push("/curriculo-display/visualize-cv");
    } catch (error) {
      console.error("Erro ao salvar currículo:", error);
    } finally {
      setLoading(false);
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
          {/* Upload de Arquivo */}
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
              <span>Anexar Arquivo</span>
              <input id="file-upload" type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Campos do Formulário */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                value={formData.full_name || ""}
                onChange={(e) => handleChange("full_name", e.target.value)}
                placeholder="Nome Completo"
                className={`w-full px-4 py-2 border ${errors.full_name ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50`}
              />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
            </div>

            <DropdownCheckboxPosition value={formData.position || ""} onChange={(value) => handleChange("position", value)} />

            {/* Selecionador de Data */}
            <div>
              <label className="block text-white mb-2">Data do Cadastro</label>
              <DatePicker
                selected={registrationDate}
                onChange={(date) => setRegistrationDate(date)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                dateFormat="dd/MM/yyyy"
              />
            </div>
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

export default ResumeForm;
