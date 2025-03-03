"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/components/navigation/navigation";
<<<<<<< HEAD
import {  } from "@/app/services/vacancyService";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useVacancyContext } from "@/app/context/VacancyContext";
import { useResumeContext } from "@/app/context/CurriculoContext";
import { useReminderContext } from "@/app/context/ReminderContext";
// import { HoursBankService } from "@/app/services/hoursBankService"

export default function DashboardDisplay() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const router = useRouter();
  const { employees } = useEmployeeContext();
  const { vacancies } = useVacancyContext();
  // const { resumes } = useResumeContext();
  const { reminders } = useReminderContext();
  // const { hoursBank } = useHoursBankContext();

  const defaultLayout: Layout[] = [
    { i: "vagas", x: 0, y: 0, w: 3, h: 3 },
    { i: "funcionario", x: 3, y: 0, w: 3, h: 3 },
    { i: "banco-de-horas", x: 6, y: 0, w: 3, h: 3 },
    { i: "curriculos", x: 0, y: 3, w: 6, h: 3 },
    { i: "lembretes", x: 6, y: 3, w: 6, h: 3 },
    { i: "adicionar-funcionario", x: 9, y: 0, w: 3, h: 3 },
  ];

  const [layout, setLayout] = useState<Layout[]>(defaultLayout);
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeout = useRef<NodeJS.Timeout | null>(null);
//
//   useEffect(() => {
//     const savedLayout = localStorage.getItem("dashboardLayout");
//     if (savedLayout) {
//       setLayout(JSON.parse(savedLayout));
//     }
//
//     async function fetchData() {
//       try {
//         const [empData, vacData, resumeData, remData] = await Promise.all([
//           EmployeeService.getAllEmployees(),
//           VacancyService.getAllVacancies(),
//           ResumeService.getAllResumes(),
//           ReminderService.getAllReminders(),
//           // HoursBankService.getAllHours(),
//         ]);
//       } catch (error) {
//         console.error("Erro ao carregar os dados do dashboard:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
  }, []);


  const onMouseDown = () => {
    dragTimeout.current = setTimeout(() => {
      console.log("Agora é arrasto!");
      setIsDragging(true);
    }, 2000);
  };

  const onMouseUp = () => {
    console.log("Soltou!");
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
      dragTimeout.current = null;
    }
    setIsDragging(false);
  };

  const handleNavigation = (path: string) => {
    if (isDragging) {
      console.log("Ignorando clique, pois virou arrasto.");
      return;
    }
    router.push(path);
  };

  const maxItemsToShow = 5;

  const [loading, setLoading] = useState(true);
=======
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
>>>>>>> fix_context

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
<<<<<<< HEAD
      <div className="bg-[#4A701C] shadow-lg rounded-xl p-8 mt-24 mx-8 overflow-auto h-full min-h-screen">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          compactType="vertical"
          onLayoutChange={handleLayoutChange}
          useCSSTransforms={false}
          isDroppable={false}
        >
          {/* Banco de Horas */}
          <div
            key="banco-de-horas"
            className="cursor-pointer bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/hoursbank-display/")}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Banco de Horas</h2>
            <ul>
              {/* {loading ? (
              <p className="text-white text-sm">Carregando...</p>
              ) : (
              resumes.length > 0 ? (
                resumes.slice(0, maxItemsToShow).map((resume, index) => (
                  <li key={index}>{resume.fullName} - {resume.position}</li>
                ))
              ) : (
                <p className="text-white text-sm">Nenhum currículo disponível.</p>
              )
            )} */}
            </ul>
          </div>

        {/* Lembretes */}
        <div
          key="lembretes"
          className="cursor-pointer bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
          onClick={() => handleNavigation("/reminder-display/")}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <ul>
            {loading ? (
              <p className="text-white text-sm">Carregando...</p>
            ) : (
              vacancies.length > 0 ? (
                vacancies.slice(0, maxItemsToShow).map((vacancy, index) => (
                  <li key={index}>{vacancy.position} - {vacancy.quantity} disponíveis</li>
                ))
              ) : (
                <p className="text-white text-sm">Nenhuma vaga disponível.</p>
              )
            )}
          </ul>
        </div>
=======
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
>>>>>>> fix_context

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
