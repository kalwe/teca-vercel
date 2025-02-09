"use client";

import { useState, useEffect, useRef, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useVagasContext } from "@/app/context/VagasContext";
import { vacancySchema, Vacancy, sanitizeVacancy, VacancyService } from "@/app/schemas/vacancySchema";

interface VagasFormProps {
  vacancyData: Vacancy;
  setVacancyData: React.Dispatch<React.SetStateAction<Vacancy>>;
}

const VagasForm: React.FC<VagasFormProps> = ({ vacancyData, setVacancyData }) => {
  const { vacancies, setVacancies } = useVagasContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<DatePicker | null>(null);
  const router = useRouter();

  /**
   * 🔹 Busca todas as vagas no backend ao carregar o componente
   */
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const fetchedVacancies = await VacancyService.getAllVacancies();

        if (!Array.isArray(fetchedVacancies)) {
          throw new Error("Os dados recebidos não são um array.");
        }

        const validatedVacancies = fetchedVacancies
          .map((vacancy) => {
            try {
              return sanitizeVacancy(vacancySchema.parse(vacancy)); // Validação com Zod
            } catch (error) {
              console.warn("⚠️ Vaga inválida ignorada:", error);
              return null;
            }
          })
          .filter((v) => v !== null);

        setVacancies(validatedVacancies as Vacancy[]);
      } catch (error) {
        console.error("❌ Erro ao buscar vagas:", error);
      }
    };

    fetchVacancies();
  }, [setVacancies]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const changePage = () => {
    router.push("vagas-display/nova-vaga");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
      }}
    >
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border relative flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white">Vagas</h1>
          <button
            onClick={changePage}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg shadow-md hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 transition-all duration-300"
          >
            <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-gray-700 text-sm font-medium">Adicionar vaga</span>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar vaga..."
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>

        <div className="p-4 bg-gray-700 rounded-lg shadow-inner w-full">
          <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-2">
            <h1 className="text-gray-300 font-semibold">Cargo</h1>
            <h1 className="text-gray-300 font-semibold">Quantidade</h1>
          </div>

          <div className="overflow-y-auto rounded-lg" style={{ maxHeight: "300px" }}>
            {vacancies.length > 0 ? (
              vacancies.map((vacancy: { position: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
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
              <p className="text-gray-300">Nenhuma vaga adicionada</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VagasForm;
