"use client";

import { ResumeFormProps, resumeSchema } from "@/app/schemas/cvSchema"
import { ResumeService } from "@/app/services/resumeService"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { z } from "zod"
import DropdownCheckboxPosition from "../DropDown/dropdown-position"

function ResumeForm({ mode, curriculoData }: ResumeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationDate, setRegistrationDate] = useState<Date | null>(new Date());

  const [formData, setFormData] = useState<z.infer<typeof resumeSchema>>(
    curriculoData || {
      fullName: "",
      positionId: 0,
      pdf_url: "",
      registration_date: "",
      id: 0,
    }
  );

  /**
   * Inicializa os dados do formulário ao carregar
   */
  useEffect(() => {
    if (curriculoData) {
      setFormData(curriculoData);
    }
  }, [curriculoData]);

  /**
   * Atualiza os campos do formulário e valida em tempo real
   */
  const handleChange = <K extends keyof z.infer<typeof resumeSchema>>(
    key: K,
    value: z.infer<typeof resumeSchema>[K]
  ) => {
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
  };

  /**
   * Manipula upload de arquivo
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    } else {
      alert("Por favor, selecione um arquivo válido.");
    }
  };

  /**
   * Salvar currículo na API
   */
  const handleSave = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("registrationDate", registrationDate ? registrationDate.toISOString() : "");
      formDataToSend.append("fullName", formData.fullName || "");
      formDataToSend.append("positionId", formData.positionId.toString());

      await ResumeService.createResume(formDataToSend);
      alert("✅ Currículo enviado com sucesso!");
      router.push("/curriculo-display/visualize-cv");
    } catch (error) {
      console.error("Erro ao salvar currículo:", error);
      alert("Erro ao salvar currículo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="w-full max-w-4xl p-6 bg-gray-800 shadow-md rounded-lg border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          {mode === "edit" ? "Editar Currículo" : "Novo Currículo"}
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Upload de Arquivo */}
          <div>
            <label
              htmlFor="file-upload"
              className="flex items-center gap-4 px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white cursor-pointer hover:bg-gray-600"
            >
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                📎
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
                value={formData.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Nome Completo"
                className={`w-full px-4 py-2 border ${
                  errors.fullName ? "border-red-500" : "border-gray-500"
                } rounded-lg bg-gray-700 text-white placeholder-gray-400`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
            {/* Dropdown de Posição */}
            <DropdownCheckboxPosition
            id={formData.positionId ?? null}
            onChange={(value) => handleChange('positionId', value)}
          />
          {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
        </div>

            {/* Selecionador de Data */}
            <div>
              <label className="block text-white mb-2">Data do Cadastro</label>
              <DatePicker
                selected={registrationDate}
                onChange={(date) => setRegistrationDate(date)}
                className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/curriculo-display/visualize-cv")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
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
