"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VagasForm from "@/app/components/display/vagas-form";
import { Navigation } from "@/app/components/navigation/navigation";
import { vacancySchema } from "@/app/schemas/vacancySchema";
import { z } from "zod";

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
    <div>
      {/* Componente de navegação */}
      <Navigation />

      {/* ✅ Agora passa corretamente os dados para o formulário */}
      <VagasForm vacancyData={{ ...vacancyData, id: undefined }} setVacancyData={setVacancyData} />

      {/* Botão "Voltar" */}
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
