"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CvService } from "@/app/services/cvService"; // ✅ Serviço para buscar dados do backend
import cvImage from "../assets/pasta-de-documentos (1) 1.png";
import { Cv } from "@/app/types/cv"; // Usa o tipo correto de CV

export function VisualizeCV() {
  const router = useRouter();
  const [cvs, setCvs] = useState<Cv[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Carregar currículos do backend ao montar o componente
  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const fetchedCvs = await CvService.getAllCvs();
        setCvs(fetchedCvs);
      } catch (error) {
        console.error("⚠ Erro ao buscar currículos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, []);

  // Navegar para a edição de um currículo específico
  const navigateToEdit = (id: number) => {
    router.push(`/curriculo-display/${id}`);
  };

  // Navegar para adicionar um novo currículo
  const navigateToAdd = () => {
    router.push("/curriculo-display/");
  };

  // Filtrar currículos com base no termo de busca
  const filteredCvs = useMemo(() => {
    return cvs.filter((cv) =>
      cv.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cvs]);

  return (
    <div>
      {/* Container Principal */}
      <div
        className="text-white flex justify-center items-center min-h-screen bg-transparent"
        style={{
          background:
            "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))",
        }}
      >
        <div className="w-full max-w-4xl bg-gray-800 shadow-md rounded-lg border p-6">
          {/* Barra de Pesquisa */}
          <div className="flex px-4 py-3 mb-6 rounded-md border border-blue-500 bg-gray-700 overflow-hidden">
            <input
              type="text"
              placeholder="Buscar currículo..."
              className="w-full bg-transparent text-gray-300 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-gray-400 ml-2"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>

          {/* Botão Adicionar Currículo */}
          <div className="flex items-center justify-center mb-6">
            <div
              onClick={navigateToAdd}
              className="w-[80px] h-[90px] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-md flex flex-col items-center justify-center shadow-lg hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 transition-all duration-300 cursor-pointer"
            >
              <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-gray-700 text-xs font-medium mt-2 hover:text-gray-900 transition-colors duration-300">
                Adicionar
              </span>
            </div>
          </div>

          {/* Lista de Currículos */}
          {loading ? (
            <p className="text-gray-300 text-center py-4">Carregando currículos...</p>
          ) : (
            <div className="overflow-y-auto border-t border-gray-600" style={{ maxHeight: "300px" }}>
              {filteredCvs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                  {filteredCvs.map((cv) => (
                    <div
                      key={cv.id}
                      className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => navigateToEdit(cv.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && navigateToEdit(cv.id)}
                    >
                      <h1 className="text-gray-300 font-semibold">{cv.full_name}</h1>
                      <Image alt="Currículo" src={cvImage} width={20} height={20} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 text-center py-4">Nenhum currículo encontrado.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VisualizeCV;
