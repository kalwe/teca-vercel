"use client";


import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "react-grid-layout";
import { Navigation } from "@/app/components/navigation/navigation";
import { EmployeeService } from "@/app/services/EmployeeService";
import { VacancyService } from "@/app/schemas/vacancySchema";
import { CvService } from "@/app/services/CvService";
import { ReminderService } from "@/app/services/ReminderService";
import { HoursBankService } from "@/app/services/HoursBankService";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useVagasContext } from "@/app/context/VagasContext";
import { useCvContext } from "@/app/context/CurriculoContext";
import { useReminderContext } from "@/app/context/ReminderContext";
import { useHoursBankContext } from "@/app/context/HoursBankContext";


export default function DashboardDisplay() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const router = useRouter();

  // Contextos
  const { employees } = useEmployeeContext();
  const { vacancies } = useVagasContext();
  const { cvs } = useCvContext();
  const { reminders } = useReminderContext();
  const { hoursBank } = useHoursBankContext();

  // Layout inicial padrão
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

  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }

    async function fetchData() {
      try {
        const [empData, vacData, cvData, remData, hoursData] = await Promise.all([
          EmployeeService.getAllEmployees(),
          VacancyService.getAllVacancies(),
          CvService.getAllCvs(),
          ReminderService.getAllReminders(),
          HoursBankService.getAllHours(),
        ]);

        setEmployees(empData);
        setVacancies(vacData);
        setCvs(cvData);
        setReminders(remData);
        setHoursBank(hoursData);
      } catch (error) {
        console.error("Erro ao carregar os dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
  }, []);


  const onMouseDown = () => {
    console.log("Pressionou, iniciando contagem...");

    // Aguarda 2 segundos antes de ativar o arrasto
    dragTimeout.current = setTimeout(() => {
      console.log("Agora é arrasto!");
      setIsDragging(true);
    }, 2000);
  };

  const onMouseUp = () => {
    console.log("Soltou!");

    // Cancela o timeout se o usuário soltar antes dos 2 segundos
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
      dragTimeout.current = null;
    }

    // Reseta `isDragging` para permitir cliques normais
    setIsDragging(false);
  };

  const handleNavigation = (path) => {

    if (isDragging) {
      console.log("Ignorando clique, pois virou arrasto.");
      return;
    }

    console.log("Navegando para:", path);
    router.push(path);
  };

  const maxItemsToShow = 5;

  // Dados atualizados dinamicamente nos widgets
  const [loading, setLoading] = useState(true);

  function changePage(path: string): void {
    router.push(path);
  }
  return (
    <div>
      <Navigation />
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
    {loading ? (
      <p className="text-white text-sm">Carregando...</p>
    ) : (
      hoursBank.length > 0 ? (
        hoursBank.slice(0, maxItemsToShow).map((entry, index) => (
          <li key={index}>{entry.date} - {entry.hours_worked}h</li>
        ))
      ) : (
        <p className="text-white text-sm">Nenhum dado encontrado.</p>
      )
    )}
  </ul>
</div>

{/* Vagas */}
<div
  key="vagas"
  className="cursor-pointer bg-gradient-to-br from-[#434D36] to-[#555D4C] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
  onMouseDown={onMouseDown}
  onMouseUp={onMouseUp}
  onClick={() => handleNavigation("/vagas-display/")}
>
  <h2 className="font-semibold text-xl mb-4 text-white">Vagas</h2>
  <ul
  >
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


          {/* Funcionários */}
          <div
            key="funcionario"
            className="cursor-pointer bg-gradient-to-br from-[#4A701C] to-[#88B257] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/contract-display/employee/")}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Funcionários</h2>
            <ul className="text-white text-sm">
            {loading ? (
  <p className="text-white text-sm">Carregando...</p>
) : (
  employees.length > 0 ? (
    employees.slice(0, maxItemsToShow).map((employee, index) => (
      <li key={index}>{employee.name} - {employee.role?.name || "Sem função"}</li>
    ))
  ) : (
    <p className="text-white text-sm">Nenhum funcionário encontrado.</p>
  )
)}

            </ul>
          </div>

          {/* Currículos */}
          <div
            key="curriculos"
            className="cursor-pointer bg-gradient-to-br from-[#284703] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/curriculo-display/visualize-cv")}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Currículos</h2>
            <ul className="text-white text-sm">
            {loading ? (
  <p className="text-white text-sm">Carregando...</p>
) : (
  cvs.length > 0 ? (
    cvs.slice(0, maxItemsToShow).map((cv, index) => (
      <li key={index}>{cv.full_name} - {cv.position}</li>
    ))
  ) : (
    <p className="text-white text-sm">Nenhum currículo disponível.</p>
  )
)}
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
            <h2 className="font-semibold text-xl mb-4 text-white">Lembretes</h2>
            <ul className="text-white text-sm">
            {loading ? (
  <p className="text-white text-sm">Carregando...</p>
) : (
  reminders.length > 0 ? (
    reminders.slice(0, maxItemsToShow).map((reminder, index) => (
      <li key={index}>{reminder.reason} - {reminder.date}</li>
    ))
  ) : (
    <p className="text-white text-sm">Nenhum lembrete cadastrado.</p>
  )
)}
            </ul>
          </div>
           {/* Buttons to Add Employee/User */}
           <div key="adicionar-funcionario" className="bg-gradient-to-br from-[#88B257] to-[#4A701C] rounded-2xl flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]">
            <button className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-6 py-3 rounded-full font-bold text-lg shadow-md mb-4"
              onClick={() => changePage('/contract-display/')}

              >
                Adicionar Funcionário
            </button>
            <button className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-6 py-3 rounded-full font-bold text-lg shadow-md"
              onClick={() => changePage('/user-display/')}

              >
                Adicionar Usuário
            </button>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
