"use client"; // 🔥 Isso indica que este componente roda no cliente

import VacancyForm from "@/app/components/display/vacancy-form"
import { VacancyService } from "@/app/services/vacancyService"
import { Vacancy } from "@/app/types/vacancy"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditVacancyClient() {
  const router = useRouter();
  const params = useParams();
  const vacancyId = Number(params.id);

  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNaN(vacancyId)) {
      alert("ID inválido. Redirecionando...");
      router.replace("/vagas-display/");
      return;
    }

    async function fetchVacancy() {
      try {
        const data = await VacancyService.getVacancyById(vacancyId);
        setVacancy(data);
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
        router.replace("/vagas-display/");
      } finally {
        setLoading(false);
      }
    }

    fetchVacancy();
  }, [vacancyId, router]);

  if (loading) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }

  return vacancy ? <VacancyForm vacancyData={vacancy} /> : <p>Vaga não encontrada.</p>;
}
