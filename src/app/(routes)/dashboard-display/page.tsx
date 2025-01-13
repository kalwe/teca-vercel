"use client";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useState, useEffect, useCallback, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { DropDownBurger } from "@/app/components/DropDown/dropdown-burger";

import './style.css';

export default function Home() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const router = useRouter();

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

  // Save layout to localStorage whenever it changes
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

  return (
    <div className="p-0 overflow-y-auto">
      {/* Navbar */}
      <nav
        style={{ backgroundColor: '#53594BCC' }}
        className="w-full border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <a href="#" className="text-2xl font-semibold whitespace-nowrap text-white">
            COIF
          </a>
          {/* Botão Hamburger */}
          <button
            onClick={toggleMenu}
            className="fixed top-1 right-4 z-50 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-lg"
          >
            <div className="relative w-[20px] h-[20px]">
              <span
                className={`absolute top-1/2 left-1/2 bg-white w-[20px] h-[2px] rounded transform transition-transform duration-300 ${
                  isMenuOpen
                    ? "rotate-45 -translate-x-1/2 -translate-y-1/2"
                    : "-translate-x-1/2 -translate-y-[6px]"
                }`}
              ></span>
              <span
                className={`absolute top-1/2 left-1/2 bg-white w-[20px] h-[2px] rounded transform transition-transform duration-300 ${
                  isMenuOpen
                    ? "-rotate-45 -translate-x-1/2 -translate-y-1/2"
                    : "-translate-x-1/2 translate-y-[6px]"
                }`}
              ></span>
            </div>
          </button>

          <DropDownBurger isOpen={isMenuOpen} />
        </div>
      </nav>

      <div className="bg-[#4A701C] shadow-lg rounded-xl p-8 mt-4 mx-8 overflow-y-auto h-max-[50%]">
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
                <li>Torneiro Mecânico</li>
                <li>Auxiliar de RH</li>
                <li>Departamento Pessoal</li>
              </ul>
            </div>
          </div>

          <div
            key="funcionario"
            className="bg-gradient-to-br from-[#4A701C] to-[#88B257] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="w-[50%]"
              onClick={() => changePage('/contract-display/employee/')}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              <h2 className="font-semibold text-xl mb-4 text-white">Funcionário</h2>
              <ul className="list-disc pl-5 text-white space-y-2">
                <li>Juracir</li>
                <li>Pedro Fagundes</li>
                <li>Jorge Aragão</li>
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
                <li>Fernanda Almeida - fernanda@gmail.com</li>
                <li>João Silva - joao@gmail.com</li>
              </ul>
            </div>
          </div>

          <div
            key="lembretes"
            className="bg-gradient-to-br from-[#555D4C] to-[#434D36] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-y-auto"
          >
            <div className="w-[35%]"
              onClick={() => changePage('/reminder-display/')}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              <h2 className="font-semibold text-xl mb-4 text-white">Lembretes</h2>
              <ul className="list-disc pl-5 text-white space-y-2">
                <li>Aniversário Pedro - 20 Dezembro</li>
                <li>Relatório - 21 Dezembro</li>
              </ul>
            </div>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
