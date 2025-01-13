'use client';
import { useEffect, useRef, useState } from "react";

interface DropdownCheckboxFuncaoProps {
  value: string; // Valor controlado
  onChange: (value: string) => void; // Callback para atualizar o estado no componente pai
}

export function DropdownCheckboxFuncao({
  value = "",
  onChange,
}: DropdownCheckboxFuncaoProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla a visibilidade do dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Alterna a visibilidade do dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Botão para alternar o dropdown */}
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className="bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white-800 w-[100%]"
        type="button"
      >
        {value || "Função"} {/* Mostra o valor selecionado ou "Função" */}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownDefaultCheckbox"
          className="z-10 w-48 bg-white divide-y divide-gray-100 absolute rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {["Cargo1", "Cargo2", "Cargo3"].map((option) => (
              <li key={option}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${option}`}
                    type="radio" // Usando radio para seleção exclusiva
                    value={option}
                    checked={value === option} // Controlado pelo valor recebido
                    onChange={() => onChange(option)} // Atualiza o estado no componente pai
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`checkbox-item-${option}`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownCheckboxFuncao;
