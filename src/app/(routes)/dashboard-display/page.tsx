"use client";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useState, useEffect, useCallback, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { DropDownBurger } from "@/app/components/DropDown/dropdown-burger";
import { useEmployeeContext } from "@/app/context/EmployeeContext"; // Importa o contexto dos funcionários
import { useVagasContext } from "@/app/context/VagasContext";
import { useCurriculoContext } from '@/app/context/CurriculoContext';
import { useReminderContext } from "@/app/context/ReminderContext";


import "./style.css";
import { Navigation } from "@/app/components/navigation/navigation";

export default function Home() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const router = useRouter();

  const { employees } = useEmployeeContext();
  const { vagas } = useVagasContext();
  const { curriculos } = useCurriculoContext();
  const { reminders } = useReminderContext();

  const defaultLayout = [
    { i: "vagas", x: 0, y: 0, w: 3, h: 3 },
    { i: "funcionario", x: 3, y: 0, w: 3, h: 3 },
    { i: "banco-de-horas", x: 6, y: 0, w: 3, h: 3 },
    { i: "adicionar-funcionario", x: 9, y: 0, w: 3, h: 3 },
    { i: "curriculos", x: 0, y: 3, w: 6, h: 3 },
    { i: "lembretes", x: 6, y: 3, w: 6, h: 3 },
  ];

  const [layout, setLayout] = useState(defaultLayout);

  // Load saved layout from localStorage on initial render
  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
  }, []);

  const handleLayoutChange = useCallback((newLayout: SetStateAction<{ i: string; x: number; y: number; w: number; h: number; }[]>) => {
    setLayout(newLayout);
    localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
  }, []);

  const changePage = useCallback((path: string) => {
    router.push(path);
  }, [router]);



  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const maxEmployeesToShow = 5;
  const displayedEmployees = employees.slice(0, maxEmployeesToShow);
  const maxVagasToShow = 5;

  return (
    <div className="p-0 overflow-y-auto">
      {/* Navbar */}
     <Navigation/>

      <div className="bg-[#4A701C] shadow-lg rounded-xl p-8 mt-24 mx-8 overflow-y-auto h-max-[50%]">
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

         {/* Vagas */}
          <div
            key="vagas"
            className="bg-gradient-to-br from-[#434D36] to-[#555D4C] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="w-[40%]"
              onClick={() => changePage('/vagas-display/')}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              <h2 className="font-semibold text-xl mb-4 text-white">Vagas</h2>
              <ul className="list-disc pl-5 text-white space-y-2">
              {vagas.map((vaga, index) => (
                  <li key={index}>
                    {vaga.vaga} - {vaga.quantidade} disponíveis
                  </li>
                ))}
                {employees.length > maxEmployeesToShow && (
                  <li className="text-sm text-gray-400">
                    + {vagas.length - maxVagasToShow} mais...
                  </li>
                )}
              </ul>
            </div>
          </div>
 {/* Widget Funcionário */}
 <div
            key="funcionario"
            className="bg-gradient-to-br from-[#4A701C] to-[#88B257] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"

          >
            <div
             onClick={() => changePage("/contract-display/employee/")}

             onMouseDown={(event) => event.stopPropagation()}
             onTouchStart={(event) => event.stopPropagation()}
            >
              <h2 className="font-semibold text-xl mb-4 text-white">Funcionários</h2>
              <ul className="list-disc pl-5 text-white space-y-2">
                {displayedEmployees.map((employee) => (
                  <li key={employee.id}>
                    <span className="font-bold">{employee.name}</span> - {employee.role || "Função não definida"}
                  </li>
                ))}
                {employees.length > maxEmployeesToShow && (
                  <li className="text-sm text-gray-400">
                    + {employees.length - maxEmployeesToShow} mais...
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div
            key="banco-de-horas"
            className="bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="w-[50%]"
              onClick={() => changePage('/hoursbank-display/')}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              <h2 className="font-semibold text-xl mb-4 text-white">Banco de Horas</h2>
              <ul className="list-disc pl-5 text-white space-y-2">
                <li>+5h Semanais</li>
                <li>-5h Semanais</li>
                <li>+10h Semanais</li>
              </ul>
            </div>
          </div>

          <div
            key="adicionar-funcionario"
            className="bg-gradient-to-br from-[#88B257] to-[#4A701C] rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <button
              className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-8 py-4 rounded-full font-bold text-lg shadow-md"
              onClick={() => changePage('/contract-display/')}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              Adicionar Funcionário
            </button>
            <button
              className="text-white bg-[#284703] hover:bg-[#4A701C] transition-all px-8 py-4 rounded-full font-bold text-lg shadow-md"
              onClick={() => changePage('/user-display/')}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              Adicionar Usuário
            </button>
          </div>

          <div
            key="curriculos"
            className="bg-gradient-to-br from-[#284703] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="w-[40%]"
              onClick={() => changePage('/curriculo-display/visualize-cv')}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              <h2 className="font-semibold text-xl mb-4 text-white">Currículos</h2>
              <ul className="list-disc pl-5 text-white space-y-2">
              {curriculos.map((curriculo) => (
        <li key={curriculo.id}>
          {curriculo.nome} - {curriculo.email}
        </li>
      ))}
              </ul>
            </div>
          </div>

          <div
  key="lembretes"
  className="bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-y-auto"
>
  <div
    className="w-full"
    onMouseDown={(event) => event.stopPropagation()}
    onTouchStart={(event) => event.stopPropagation()}
    onClick={() => changePage('/reminder-display/')}
  >
    <h2 className="font-semibold text-xl mb-4 text-white">Lembretes</h2>
    <ul className="list-disc pl-5 text-white space-y-2">
      {reminders.length > 0 ? (
        reminders.map((reminder) => (
          <li key={reminder.id} className="flex justify-between items-center">
            <span>
              <strong>{reminder.reason}</strong> - {reminder.date}
            </span>
          </li>
        ))
      ) : (
        <p className="text-gray-400">Nenhum lembrete ativo.</p>
      )}
    </ul>
  </div>
</div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
