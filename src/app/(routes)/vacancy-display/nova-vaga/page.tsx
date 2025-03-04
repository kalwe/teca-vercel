"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NewVacancyForm from "@/app/components/display/vacancy-form";
import { Navigation } from "@/app/components/navigation/navigation";
import { vacancySchema } from "@/app/schemas/vacancySchema";
import { VacancyService } from "@/app/services/vacancyService";
import { z } from "zod";
import ComebackButton from "@/app/components/button/comeback";

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
        // isEditMode={isEditMode}
      />
<ComebackButton/>
    </div>
  );
}
