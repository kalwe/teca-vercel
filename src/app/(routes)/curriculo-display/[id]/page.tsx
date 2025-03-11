"use client";

import ResumeForm from "@/app/components/display/resume-form"
import { Navigation } from "@/app/components/navigation/navigation"
import { ResumeService } from "@/app/services/resumeService"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CurriculoDetailPage() {
  const { id } = useParams(); // Pega o ID da URL
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchResume = async () => {
      setLoading(true);
      try {
        const resumeData = await ResumeService.getResumeById(id);
        setFormData(resumeData);
      } catch (error) {
        console.error("Erro ao carregar o currículo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-white text-lg font-semibold">
          Carregando os dados do currículo...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      {formData ? (
        <ResumeForm  />
      ) : (
        <p className="text-center text-white text-lg font-semibold">
          Currículo não encontrado.
        </p>
      )}
    </div>
  );
}
