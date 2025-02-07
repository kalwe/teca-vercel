"use client";
import React, { useState, useEffect, useRef } from "react";
import { PositionService } from "@/app/services/dropdownService";
import { positionSchema } from "@/app/schemas/positionSchema"; // ✅ Importando o Schema
import { DropdownCheckboxProps } from '@/app/types/dropdown'; // ✅ Usando tipagem correta

const DropdownCheckboxPosition = ({
  value = "",
  onChange,
}: DropdownCheckboxProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [positions, setPositions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 📌 Busca os cargos da API ao carregar o componente
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PositionService.getAllPositions();

        if (!Array.isArray(data)) {
          throw new Error("Formato de resposta inválido.");
        }

        // 🔥 Valida os dados da API antes de armazenar
        const validPositions = data
          .map((position) => {
            try {
              return positionSchema.parse(position); // ✅ Valida cada item
            } catch (err) {
              console.error("Erro de validação no cargo:", err);
              return null;
            }
          })
          .filter((p): p is { id: number; name: string } => p !== null); // Remove valores inválidos

        setPositions(validPositions);
      } catch (err) {
        setError("Erro ao carregar cargos.");
        console.error("❌ Erro ao buscar cargos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  // 🔍 Valida e atualiza a seleção
  const handleSelect = (option: string) => {
    try {
      positionSchema.parse({ id: 1, name: option }); // 🔍 Validação antes de salvar
      setSelectedOption(option);
      onChange(option);
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Erro na validação da seleção:", err);
    }
  };

  // Fecha o dropdown ao clicar fora dele
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
    <div className="relative w-full">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className={`bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-full flex justify-between items-center text-left ${
          error ? "border-red-500" : ""
        }`}
        disabled={loading || !!error}
      >
        <span>
          {loading ? "Carregando..." : error ? "Erro ao carregar" : selectedOption || "Escolha um cargo"}
        </span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* Exibe erro caso a API falhe */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {isDropdownOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-md" ref={dropdownRef}>
          {loading && <p className="text-center p-2">Carregando...</p>}
          {!loading && !error && (
            <ul className="p-2">
              {positions.length > 0 ? (
                positions.map((position) => (
                  <li
                    key={position.id}
                    className={`p-2 cursor-pointer ${
                      selectedOption === position.name ? "bg-gray-300" : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleSelect(position.name)}
                  >
                    {position.name}
                  </li>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">Nenhum cargo disponível.</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckboxPosition;
