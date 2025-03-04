"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VacancyForm from "@/app/components/display/registered-vacancies";
import { Navigation } from "@/app/components/navigation/navigation";
import { vacancySchema } from "@/app/schemas/vacancySchema";
import { z } from "zod";
import ComebackButton from "@/app/components/button/comeback";

// 🔹 Define o tipo baseado no Schema do Zod
type Vacancy = z.infer<typeof vacancySchema>;

export default function Contract() {
  const router = useRouter();

  // ✅ Estado inicial validado com `safeParse()` para evitar crashes inesperados
  const initialVacancyData = vacancySchema.safeParse({
    id: undefined, // 🔥 Agora opcional
    position: "",
    quantity: 1,
    description: "",
    requirements: "",
    benefits: "",
    salary: 0,
  });

  const [vacancyData, setVacancyData] = useState<Vacancy>(
    initialVacancyData.success ? initialVacancyData.data : { position: "", quantity: 1, description: "", requirements: "", benefits: "", salary: 0 }
  );

  return (
    <div
    style={{
      background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
    }}
    >
      {/* Componente de navegação */}
      <Navigation />

      <VacancyForm vacancyData={{ ...vacancyData, id: undefined }} setVacancyData={setVacancyData} />
<ComebackButton/>
    </div>
  );
}
