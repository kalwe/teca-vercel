"use client";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "react-grid-layout";
import { useHoursBankContext } from "@/app/context/HoursBankContext";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useVagasContext } from "@/app/context/VagasContext";
import { useCvContext } from "@/app/context/CurriculoContext";
import { useReminderContext } from "@/app/context/ReminderContext";
import { Navigation } from "@/app/components/navigation/navigation";

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

  useEffect(() => {
    // Recuperar layout salvo no localStorage
    const savedLayout = localStorage.getItem("dashboardLayout");
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
  }, []);

  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
  }, []);

  const handleNavigation = useCallback((path: string) => {
    if (!isDragging) {
      router.push(path);
    }
  }, [router, isDragging]);

  const onDragStart = () => setIsDragging(true);
  const onDragStop = () => setTimeout(() => setIsDragging(false), 100);

  const maxItemsToShow = 5;

  // Dados atualizados dinamicamente nos widgets
  const displayedEmployees = useMemo(() => employees.slice(0, maxItemsToShow), [employees]);
  const displayedVagas = useMemo(() => vacancies.slice(0, maxItemsToShow), [vacancies]);
  const displayedHours = useMemo(() => hoursBank.slice(0, maxItemsToShow), [hoursBank]);
  const displayedCvs = useMemo(() => cvs.slice(0, maxItemsToShow), [cvs]);
  const displayedReminders = useMemo(() => reminders.slice(0, maxItemsToShow), [reminders]);

  function changePage(arg0: string): void {
    throw new Error("Function not implemented.");
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
          onDragStart={onDragStart}
          onDragStop={onDragStop}
        >
          {/* Banco de Horas */}
          <div
            key="banco-de-horas"
            className="cursor-pointer bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/hoursbank-display/")}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Banco de Horas</h2>
            <ul className="text-white text-sm">
              {displayedHours.map((entry, index) => (
                <li key={index}>{entry.date} - {entry.hours_worked}h</li>
              ))}
            </ul>
          </div>

          {/* Vagas */}
          <div
            key="vagas"
            className="cursor-pointer bg-gradient-to-br from-[#434D36] to-[#555D4C] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/vagas-display/")}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Vagas</h2>
            <ul className="text-white text-sm">
              {displayedVagas.map((vacancy, index) => (
                <li key={index}>{vacancy.position} - {vacancy.quantity} disponíveis</li>
              ))}
            </ul>
          </div>

          {/* Funcionários */}
          <div
            key="funcionario"
            className="cursor-pointer bg-gradient-to-br from-[#4A701C] to-[#88B257] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/contract-display/employee/")}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Funcionários</h2>
            <ul className="text-white text-sm">
              {displayedEmployees.map((emp, index) => (
                <li key={index}>{emp.name} - {emp.role?.name || "Sem função"}</li>
              ))}
            </ul>
          </div>

          {/* Currículos */}
          <div
            key="curriculos"
            className="cursor-pointer bg-gradient-to-br from-[#284703] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/curriculo-display/visualize-cv")}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Currículos</h2>
            <ul className="text-white text-sm">
              {displayedCvs.map((cv, index) => (
                <li key={index}>{cv.full_name} - {cv.position}</li>
              ))}
            </ul>
          </div>

          {/* Lembretes */}
          <div
            key="lembretes"
            className="cursor-pointer bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]"
            onClick={() => handleNavigation("/reminder-display/")}
          >
            <h2 className="font-semibold text-xl mb-4 text-white">Lembretes</h2>
            <ul className="text-white text-sm">
              {displayedReminders.map((reminder, index) => (
                <li key={index}>{reminder.reason} - {reminder.date}</li>
              ))}
            </ul>
          </div>
           {/* Buttons to Add Employee/User */}
           <div key="adicionar-funcionario" className="bg-gradient-to-br from-[#88B257] to-[#4A701C] rounded-2xl flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[200px]">
            <button className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-6 py-3 rounded-full font-bold text-lg shadow-md mb-4"
              onClick={() => changePage('/contract-display/')}>Adicionar Funcionário
            </button>
            <button className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-6 py-3 rounded-full font-bold text-lg shadow-md"
              onClick={() => changePage('/user-display/')}>Adicionar Usuário
            </button>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
