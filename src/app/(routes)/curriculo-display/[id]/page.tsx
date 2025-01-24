"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CvForm from "@/app/components/forms/cv-form";
import { useCurriculoContext } from "@/app/context/CurriculoContext";
import "../style.css";
import { Navigation } from "@/app/components/navigation/navigation";

export default function CurriculoDetailPage() {
  const { curriculos, updateCurriculo } = useCurriculoContext();
  const [formData, setFormData] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const curriculoId = params.id; // ID da rota é sempre uma string

    if (!curriculoId) {
      alert("ID inválido! Redirecionando...");
      router.push("/curriculo-display/visualize-cv");
      return;
    }

    const curriculo = curriculos.find((c) => c.id === curriculoId);

    if (!curriculo) {
      alert("Currículo não encontrado! Redirecionando...");
      router.push("/curriculo-display/visualize-cv");
    } else {
      setFormData(curriculo);
    }
  }, [params.id, curriculos, router]);

  const handleSave = (updatedData: any) => {
    // A função updateCurriculo aceita apenas um argumento
    updateCurriculo(updatedData);
    alert("Currículo atualizado com sucesso!");
    router.push("/curriculo-display/visualize-cv");
  };

  const handleCancel = () => {
    router.push("/curriculo-display/visualize-cv");
  };

  if (!formData) {
    return <p className="text-center text-white">Carregando os dados do currículo...</p>;
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <CvForm
        mode="edit"
        curriculoData={formData} // Passar os dados do currículo para edição
        onSave={handleSave} // Função para salvar
        onCancel={handleCancel} // Função para cancelar
      />
    </div>
  );
}
