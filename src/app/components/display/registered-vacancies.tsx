"use client";

import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useVagasContext } from "@/app/context/VagasContext";
import { VacancyService } from "@/app/schemas/vacancySchema";

const VagasForm: React.FC = () => {
  const { vacancies, setVacancies } = useVagasContext();
  const router = useRouter();

  /**
   * Carrega as vagas automaticamente ao abrir a página
   */
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const fetchedVacancies = await VacancyService.getAllVacancies();
        if (!Array.isArray(fetchedVacancies)) throw new Error("Dados inválidos recebidos.");
        setVacancies(fetchedVacancies);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };

    fetchVacancies(); // TODO: o method fetchedVacancies eh async
  }, [setVacancies]); // TODO: pq passar o setVacancies ?!?

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border flex flex-col gap-6">

        {/* Título e Botão Adicionar Vaga */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white">Vagas</h1>
          <button
            onClick={() => router.push("/vagas-display/nova-vaga")}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105"
          >
            <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">Adicionar Vaga</span>
          </button>
        </div>

        {/* Lista de Vagas */}
        <div className="p-4 bg-gray-700 rounded-lg shadow-inner w-full">
          <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-2">
            <h1 className="text-gray-300 font-semibold">Cargo</h1>
            <h1 className="text-gray-300 font-semibold">Quantidade</h1>
          </div>

          <div className="overflow-y-auto rounded-lg" style={{ maxHeight: "300px" }}>
            {vacancies.length > 0 ? (
              vacancies.map((vacancy, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/vagas-display/nova-vaga?index=${index}`)}
                  className="flex justify-between items-center p-2 bg-gray-800 rounded-md mb-2 cursor-pointer hover:bg-gray-700"
                >
                  <span className="text-gray-300 font-medium">{vacancy.position}</span>
                  <span className="text-gray-300 font-medium">{vacancy.quantity}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-center">Nenhuma vaga carregada</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VagasForm;
