"use client";

import { useState } from "react";
import { DropDownBurger } from "../DropDown/dropdown-burger";
import { useRouter } from "next/navigation";


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter()

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{ background: "linear-gradient(to right, #2F3E29, #53594B)" }}
        className="w-full px-6 py-4 shadow-md fixed top-0 left-0 z-50 flex items-center justify-between"
      >
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition"
          onClick={() => router.push('/dashboard-display')}
        >
          SIGFLOR
        </a>
        {/* Navegação à Direita */}
        <div className="flex items-center gap-6">
          {/* Dropdown do Usuário */}
          {/* Botão Hamburger */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-[50px] h-[50px] bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 shadow-lg"
          >
            <div className="relative flex flex-col justify-between w-[25px] h-[20px]">
              {/* Linha superior */}
              <span
                className={`bg-white h-[3px] rounded transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
              ></span>
              {/* Linha do meio */}
              <span
                className={`bg-white h-[3px] rounded transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              {/* Linha inferior */}
              <span
                className={`bg-white h-[3px] rounded transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Dropdown Menu para Mobile */}
      <DropDownBurger isOpen={isMenuOpen} />
    </div>
  );
}
