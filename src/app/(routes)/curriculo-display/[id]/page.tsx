"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CvForm from "@/app/components/display/cv-form";
import { Navigation } from "@/app/components/navigation/navigation";
import { CvService } from "@/app/schemas/cvSchema";

export default function CurriculoDetailPage() {
  const { id } = useParams(); // Pega o ID da URL
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (id) {
      const fetchCv = async () => {
        try {
          const cvData = await CvService.getCvById(id);
          setFormData(cvData);
        } catch (error) {
          console.error("Erro ao carregar o currículo:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCv();
    }
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
      {formData && (
        <CvForm
          mode="edit"
          isEditable={true}
          initialData={formData} // Passa os dados carregados para o formulário
        />
      )}
    </div>
  );
}
