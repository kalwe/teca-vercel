"use client";

import { ResumeService } from "@/app/services/resumeService"
import type { ResumeType } from "@/app/types/resume"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import DropdownCheckboxPosition from "../DropDown/dropdown-position"

export default function ResumeForm() {
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = !!id;
  const resumeId = isEditMode ? Number(id) : null;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<ResumeType>>({});

  const handleChange = <K extends keyof ResumeType>(field: K, value: ResumeType[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSave = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("fullName", formData.fullName || "");
      formDataToSend.append("positionId", formData.positionId?.toString() || "");

      if (isEditMode && resumeId) {
        await ResumeService.updateResume(resumeId, formDataToSend);
        alert("Currículo atualizado com sucesso!");
      } else {
        await ResumeService.createResume(formDataToSend);
        alert("Currículo criado com sucesso!");
      }
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
          {isEditMode ? "Editar Currículo" : "Novo Currículo"}
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                value={formData.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Nome Completo"
                className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <DropdownCheckboxPosition
                id={formData.positionId ?? null}
                onChange={(value) => handleChange("positionId", value)}
              />
            </div>
          </div>

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
              {loading ? "Salvando..." : isEditMode ? "Atualizar Currículo" : "Salvar Currículo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
