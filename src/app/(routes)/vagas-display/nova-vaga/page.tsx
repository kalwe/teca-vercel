"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NewVacancyForm from "@/app/components/display/newVacancy-form";
import { Navigation } from "@/app/components/navigation/navigation";
import { vacancySchema } from "@/app/schemas/vacancySchema";
import { VacancyService } from "@/app/services/vacancyService";
import { z } from "zod";

// 🔹 Define o tipo baseado no Schema do Zod
type Vacancy = z.infer<typeof vacancySchema>;

export default function Contract() {
  const router = useRouter();
  const params = useParams();
  const vacancyId = params?.id ? Number(params.id) : undefined;

  const [vacancyData, setVacancyData] = useState<Vacancy>({
    id: undefined,
    position: "",
    quantity: 1,
    description: "",
    requirements: "",
    benefits: "",
    salary: 0,
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = vacancyId !== undefined;

  // Se for modo de edição, carrega os dados da vaga
  useEffect(() => {
    const fetchVacancyData = async () => {
      if (isEditMode && vacancyId) {
        try {
          setLoading(true);
          const vacancy = await VacancyService.getVacancyById(vacancyId);
          setVacancyData(vacancy);
        } catch (error) {
          console.error("Erro ao carregar dados da vaga:", error);
          alert("Erro ao carregar dados da vaga. Tente novamente.");
          router.push("/vagas-display/");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVacancyData();
  }, [vacancyId, isEditMode, router]);

  const handleSaveOrUpdate = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const validatedData = vacancySchema.parse(vacancyData);

      if (isEditMode) {
        // Modo de Edição
        await VacancyService.updateVacancy(validatedData.id!, validatedData);
        alert("Vaga atualizada com sucesso!");
      } else {
        // Modo de Criação
        await VacancyService.createVacancy(validatedData);
        alert("Vaga criada com sucesso!");
      }

      router.push("/vagas-display/");
    } catch (error) {
      console.error("Erro ao salvar vaga:", error);
      alert("Erro ao salvar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
      }}
    >
      <Navigation />

      <NewVacancyForm
        vacancyData={vacancyData}
        setVacancyData={setVacancyData}
        onSave={handleSaveOrUpdate}
        isEditMode={isEditMode}
      />

      <div
        style={{ backgroundColor: "#D9D9D963", zIndex: 6 }}
        className="absolute right-[88%] bottom-[70%] text-white p-4 rounded-[21px] h-[12%] shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        <button
          className="w-[30px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/dashboard-display/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
