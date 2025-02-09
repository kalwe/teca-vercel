'use client';
import { useEffect, useRef, useState } from "react";
import { DropdownCheckboxFuncaoProps } from "@/app/types/dropdown";
import { RoleService } from "@/app/services/dropdownService";

export function DropdownCheckboxFuncao({
  value = "",
  onChange,
}: DropdownCheckboxFuncaoProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla a visibilidade do dropdown
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]); // Armazena os cargos da API
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 📌 Busca os dados da API ao carregar o componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await RoleService.getAllFunctions(); // ✅ Chama a API pelo serviço
        setOptions(roles);
      } catch (err: any) {
        setError("Erro ao carregar funções.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

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
        disabled={loading || !!error} // Desabilita botão se estiver carregando ou erro
      >
        {loading
          ? "Carregando..."
          : error
          ? "Erro ao carregar"
          : value || "Selecione a Função"} {/* Mostra o valor selecionado ou placeholder */}
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

      {/* Exibe erro caso a API falhe */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Dropdown menu */}
      {isDropdownOpen && !loading && !error && (
        <div
          id="dropdownDefaultCheckbox"
          className="z-10 w-48 bg-white divide-y divide-gray-100 absolute rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {options.length > 0 ? (
              options.map((option) => (
                <li key={option.id}>
                  <div className="flex items-center">
                    <input
                      id={`checkbox-item-${option.id}`}
                      type="radio" // Usando radio para seleção exclusiva
                      value={option.name}
                      checked={value === option.name} // Controlado pelo valor recebido
                      onChange={() => onChange(option.name)} // Atualiza o estado no componente pai
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`checkbox-item-${option.id}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option.name}
                    </label>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm px-3 py-2">Nenhuma função disponível</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownCheckboxFuncao;
