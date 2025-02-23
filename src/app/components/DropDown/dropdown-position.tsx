"use client";
import React, { useState, useEffect, useRef } from "react";

const DropdownCheckboxPosition = ({
  value = "",
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [positions, setPositions] = useState<{ id: number; name: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPositions = async () => { // TODO: use axios and call endpoint getAllPositions (é pra usar a porra do ID ao invés do nome)
      try {
        const response = await fetch("/data/positions.json");
        if (!response.ok) {
          throw new Error("Erro ao carregar cargos.");
        }
        const data = await response.json();
        setPositions(data);
      } catch (error) {
        console.error("Erro ao carregar cargos:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsDropdownOpen(false);
  };

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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-full flex justify-between items-center text-left"
      >
        <span>{value || "Escolha um cargo"}</span>
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

      {isDropdownOpen && (
        <div
          className="absolute z-50 w-full bg-white border rounded-md mt-1 shadow-md"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <ul className="p-2">
            {positions.length > 0 ? (
              positions.map((position) => (
                <li
                  key={position.id}
                  className={`p-2 cursor-pointer ${
                    value === position.id ? "bg-gray-300" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSelect(position.name)}
                >
                  {position.name}
                </li>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                Nenhum cargo disponível.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckboxPosition;
