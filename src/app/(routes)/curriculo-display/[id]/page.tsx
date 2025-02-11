"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import CvForm from "@/app/components/display/cv-form";
import { useCvContext } from "@/app/context/CurriculoContext";
import { CvService, Cv, ScholarityType } from "@/app/schemas/cvSchema";
import "../style.css";
import { Navigation } from "@/app/components/navigation/navigation";

// Definição do endpoint da API (ajuste conforme necessário)
const API_URL = "https://api.example.com/cvs";

export default function CurriculoDetailPage() {
  const { cvs, updateCv } = useCvContext();
  const [formData, setFormData] = useState<Cv | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const curriculoId = Number(params.id);

    if (isNaN(curriculoId)) {
      alert("ID inválido. Redirecionando...");
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
          alert("Currículo não encontrado. Redirecionando...");
          router.replace("/curriculo-display/visualize-cv");
        }
      } catch (error) {
        console.error("Erro ao buscar currículo:", error);
        alert("Erro ao carregar currículo. Tente novamente.");
        router.replace("/curriculo-display/visualize-cv");
      }
    };

    fetchCurriculo();
  }, [params.id, cvs, router]);

  const handleSave = async (updatedData: Cv) => {
    setLoading(true);
    try {
      // Garante que o scholarity é um valor válido do enum
      const validScholarity = Object.values(ScholarityType).includes(updatedData.scholarity as ScholarityType)
        ? (updatedData.scholarity as ScholarityType)
        : ScholarityType.SECONDARY;

      const formattedData = {
        ...updatedData,
        scholarity: validScholarity,
      };

      // Atualiza currículo via API
      const response = await axios.patch(`${API_URL}/${updatedData.id}`, formattedData);

      // Atualiza o contexto com os novos dados
      updateCv(updatedData.id, response.data);

      alert("Currículo atualizado com sucesso.");
      router.push("/curriculo-display/visualize-cv");
    } catch (error: any) {
      console.error("Erro ao atualizar currículo:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erro ao atualizar currículo. Tente novamente.");
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
          Carregando os dados do currículo...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <CvForm
        mode="edit"
        curriculoData={formData}
        onSave={handleSave}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
