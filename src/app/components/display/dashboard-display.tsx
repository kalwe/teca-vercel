"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/components/navigation/navigation";
import { EmployeeService } from "@/app/services/employeeService";
import { VacancyService } from "@/app/services/vacancyService";
import { ResumeService } from "@/app/services/resumeService";
import { ReminderService } from "@/app/services/reminderService";
import { HoursBankService } from "@/app/services/hoursBankService";

export default async function DashboardDisplay() {
  const router = useRouter();
  const maxItemsToShow = 5;

  // Busca os dados direto da API sem useEffect
  let employees = [];
  let vacancies = [];
  let resumes = [];
  let reminders = [];
  let hoursBank = [];
  let loading = true;

  try {
    const [empAPI, vacAPI, resAPI, remAPI, hoursAPI] = await Promise.all([
      EmployeeService.getAllEmployees(1),
      VacancyService.getAllVacancies(),
      ResumeService.getAllResumes(),
      ReminderService.getAllReminders(),

    ]);

    employees = empAPI;
    vacancies = vacAPI;
    resumes = resAPI;
    reminders = remAPI;
    hoursBank = hoursAPI;
    loading = false;
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    loading = false;
  }

  return (
    <div className="bg-[#1C2A21] min-h-screen text-white">
      <Navigation />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">Dashboard</h1>

        {/* Grid de Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <DashboardWidget
            title="Funcionários"
            data={employees}
            maxItems={maxItemsToShow}
            navigateTo="/contract-display/employee/"
            loading={loading}
            bgGradient="from-[#2F3E34] to-[#1E2922]"
          />
          <DashboardWidget
            title="Vagas"
            data={vacancies}
            maxItems={maxItemsToShow}
            navigateTo="/vagas-display/"
            loading={loading}
            bgGradient="from-[#374E3F] to-[#2A3A2E]"
          />
          <DashboardWidget
            title="Banco de Horas"
            data={hoursBank}
            maxItems={maxItemsToShow}
            navigateTo="/hoursbank-display/"
            loading={loading}
            bgGradient="from-[#435A4C] to-[#2C3E35]"
          />
          <DashboardWidget
            title="Currículos"
            data={resumes}
            maxItems={maxItemsToShow}
            navigateTo="/curriculo-display/visualize-cv"
            loading={loading}
            bgGradient="from-[#3A5243] to-[#2B3A31]"
          />
          <DashboardWidget
            title="Lembretes"
            data={reminders}
            maxItems={maxItemsToShow}
            navigateTo="/reminder-display/"
            loading={loading}
            bgGradient="from-[#314730] to-[#1E2B1D]"
          />

          {/* Ações Rápidas */}
          <div className="bg-[#1E2922] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center space-y-4 transform transition duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-300">Ações Rápidas</h2>
            <button
              onClick={() => router.push("/contract-display/")}
              className="px-4 py-2 bg-[#3B5E3E] hover:bg-[#2E4A32] rounded-lg w-full text-white transition-all"
            >
              Adicionar Funcionário
            </button>
            <button
              onClick={() => router.push("/user-display/")}
              className="px-4 py-2 bg-[#2F4A30] hover:bg-[#253B26] rounded-lg w-full text-white transition-all"
            >
              Adicionar Usuário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Widget do Dashboard
 */
interface DashboardWidgetProps {
  title: string;
  data: any[];
  maxItems: number;
  navigateTo: string;
  loading: boolean;
  bgGradient: string;
}

function DashboardWidget({ title, data, maxItems, navigateTo, loading, bgGradient }: DashboardWidgetProps) {
  const router = useRouter();

  return (
    <div
      className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${bgGradient} transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between`}
      onClick={() => router.push(navigateTo)}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-300">{title}</h2>
      {loading ? (
        <p className="text-gray-400 text-sm">Carregando...</p>
      ) : data.length > 0 ? (
        <ul className="text-gray-300 text-sm space-y-1">
          {data.slice(0, maxItems).map((item, index) => (
            <li key={index}>{item.name || item.position || item.reason}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">Nenhum dado encontrado.</p>
      )}
    </div>
  );
}
