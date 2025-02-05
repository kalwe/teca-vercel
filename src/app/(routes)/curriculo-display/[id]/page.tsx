"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CvForm from "@/app/components/display/cv-form";
import { useCvContext } from "@/app/context/CurriculoContext";
import { CvService } from "@/app/services/cvService";
import { Cv } from "@/app/types/cv"; // ✅ Certificando-se da importação correta
import { CvFormProps } from "@/app/types/cv"; // ✅ Garantir que a tipagem correta seja usada

import "../style.css";
import { Navigation } from "@/app/components/navigation/navigation";

export default function CurriculoDetailPage() {
  const { cvs, updateCv } = useCvContext(); // ✅ Certificar-se do nome correto no contexto
  const [formData, setFormData] = useState<Cv | null>(null); // ✅ Tipagem correta
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const curriculoId = Number(params.id);

    if (isNaN(curriculoId)) {
      alert("❌ ID inválido! Redirecionando...");
      router.replace("/curriculo-display/visualize-cv");
      return;
    }

    const fetchCurriculo = async () => {
      try {
        let curriculo = cvs.find((c) => c.id === curriculoId);

        if (!curriculo) {
          curriculo = await CvService.getCvById(curriculoId);
        }

        if (curriculo) {
          setFormData(curriculo);
        } else {
          alert("⚠ Currículo não encontrado! Redirecionando...");
          router.replace("/curriculo-display/visualize-cv");
        }
      } catch (error) {
        console.error("Erro ao buscar currículo:", error);
        alert("❌ Erro ao carregar currículo! Tente novamente.");
        router.replace("/curriculo-display/visualize-cv");
      }
    };

    fetchCurriculo();
  }, [params.id, cvs, router]);

  const handleSave = async (updatedData: Cv) => {
    setLoading(true);
    try {
      const updatedCv = await CvService.updateCv(updatedData.id, updatedData);
      updateCv(updatedCv.id, updatedCv);

      alert("✅ Currículo atualizado com sucesso!");
      router.push("/curriculo-display/visualize-cv");
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error);
      alert("❌ Erro ao atualizar currículo! Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/curriculo-display/visualize-cv");
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-white text-lg font-semibold">
          🔄 Carregando os dados do currículo...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <CvForm
  mode="edit"
  curriculoData={formData} // ✅ Certifique-se que `formData` é do tipo `Cv`
  onSave={handleSave} // ✅ Agora `onSave` está corretamente passado
  onCancel={handleCancel}
  loading={loading}
/>
    </div>
  );
}
