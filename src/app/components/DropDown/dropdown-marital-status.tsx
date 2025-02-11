"use client";
import { useEffect, useRef, useState } from "react";
import { DropdownCheckboxMaritalStatusProps } from "@/app/types/dropdown";
import { MaritalStatusEnum } from "@/app/schemas/enums/maritalStatus";

export function DropdownCheckboxMaritalStatus({
  value = "", // Define um valor inicial vazio
  onChange,
  disabled = false,
}: DropdownCheckboxMaritalStatusProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(value); // Estado local para armazenar seleção
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const maritalStatusOptions = Object.entries(MaritalStatusEnum);

  // Alternar visibilidade do dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDropdownOpen((prevState) => !prevState);
    }
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Atualiza seleção de estado civil
  const handleSelection = (selectedValue: string) => {
    setSelectedStatus(selectedValue); // Atualiza estado local
    onChange(selectedValue); // Passa o valor para o componente pai
    setIsDropdownOpen(false); // Fecha o dropdown
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão para abrir dropdown */}
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className={`bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white-800 w-[100%] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="button"
        disabled={disabled} // Botão desativado se `disabled` for true
      >
        {selectedStatus || "Estado Civil"}
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
      {isDropdownOpen && !disabled && (
        <div
          id="dropdownDefaultCheckbox"
          className="z-10 w-48 bg-white divide-y divide-gray-100 absolute rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {/* Opções de Estado Civil */}
            {maritalStatusOptions.map(([key, statusValue]) => (
              <li key={key}>
                <div className="flex items-center">
                  <input
                    id={`radio-item-${key}`}
                    type="radio" // Usa radio para garantir seleção única
                    value={statusValue}
                    checked={selectedStatus === statusValue} // Apenas uma opção marcada
                    onChange={() => handleSelection(statusValue)} // Atualiza seleção
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`radio-item-${key}`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {statusValue}
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

export default DropdownCheckboxMaritalStatus;
