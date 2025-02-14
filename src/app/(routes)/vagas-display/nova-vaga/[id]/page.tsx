"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Vacancy, vacancySchema } from "@/app/schemas/vacancySchema";
import { VacancyService } from "@/app/services/vacancyService";
import NovanewVacancyForm from "@/app/components/display/newVacancy-form";
import { Navigation } from "@/app/components/navigation/navigation";
import { z } from "zod";

// Define o tipo baseado no `vacancySchema`
type VacancyInput = z.infer<typeof vacancySchema>;

export default function EditVacancyPage() {
  const [vacancyData, setVacancyData] = useState<VacancyInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const vacancyId = Number(params.id);

    if (isNaN(vacancyId)) {
      alert("ID inválido. Redirecionando...");
      router.replace("/vagas-display/");
      return;
    }

    const fetchVacancy = async () => {
      try {
        const vacancy = await VacancyService.getVacancyById(vacancyId);
        if (vacancy) {
          setVacancyData(vacancy);
        } else {
          alert("Vacancy não encontrada. Redirecionando...");
          router.replace("/vagas-display/");
        }
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
        alert("Erro ao carregar dados da vaga. Tente novamente.");
        router.replace("/vagas-display/");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [params.id, router]);

  const handleSave = async (updatedData: Vacancy) => {
    setLoading(true);
    try {
      // Valida os dados antes de enviar
      const validatedData = vacancySchema.parse(updatedData);

      // Atualiza vaga via API (PUT)
      await VacancyService.updateVacancy(validatedData.id, validatedData);

      alert("Vacancy atualizada com sucesso.");
      router.push("/vagas-display/");
    } catch (error) {
      console.error("Erro ao atualizar vaga:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erro ao atualizar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/vagas-display/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-white text-lg font-semibold">
          Carregando os dados da vaga...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      {vacancyData ? (
        <NovanewVacancyForm
          vacancyData={vacancyData}
          setVacancyData={setVacancyData}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditable={true}
        />
      ) : (
        <p className="text-center text-red-500 text-lg">Erro ao carregar os dados da vaga.</p>
      )}
    </div>
  );
}
