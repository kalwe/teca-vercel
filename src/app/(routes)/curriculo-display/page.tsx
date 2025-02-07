"use client";

import { useSearchParams } from "next/navigation"; // Importando o hook correto
import { CvService } from "@/app/schemas/cvSchema";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importando o useRouter para navegação
import CvForm from "@/app/components/display/cv-form";
import { cvSchema } from "@/app/schemas/cvSchema"; // Importando o cvSchema para validação

export default function CvRoutes() {
  const router = useRouter();

  // Usando useSearchParams para pegar parâmetros de URL
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Obtendo o parâmetro de query "id"

  // Estado de carregamento e dados do currículo
  const [loading, setLoading] = useState(false);
  const [curriculoData, setCurriculoData] = useState<any>(undefined); // Dados do currículo

  // Carregar dados de um currículo específico se for edição
  useEffect(() => {
    const loadCurriculoData = async () => {
      setLoading(true);
      try {
        if (id) {
          // Verifica se o ID está presente e busca o currículo via API
          const cv = await CvService.getCvById(Number(id)); // Buscar pelo ID
          setCurriculoData(cv); // Armazenar os dados do currículo
        }
      } catch (error) {
        console.error("Erro ao carregar currículo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCurriculoData(); // Se houver um ID na query, carrega os dados
    }
  }, [id]);

  // Função para salvar os dados
  const handleSave = async (updatedData: any) => {
    setLoading(true);
    try {
      if (updatedData.id) {
        await CvService.updateCv(updatedData.id, updatedData); // Atualiza a API
      } else {
        await CvService.createCv(updatedData); // Cria um novo currículo na API
      }
      alert("Currículo salvo com sucesso!");
      router.push("/curriculo-display/visualize-cv"); // Redireciona após salvar
    } catch (error) {
      console.error("Erro ao salvar currículo:", error);
      alert("Erro ao salvar o currículo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar e voltar para a visualização
  const handleCancel = () => {
    router.push("/curriculo-display/visualize-cv"); // Redireciona para visualizar
  };

  return (
    <div>
      <CvForm
        mode={curriculoData ? "edit" : "create"} // Verifica se estamos criando ou editando
        curriculoData={curriculoData} // Dados do currículo
        onSave={handleSave} // Callback para salvar
        onCancel={handleCancel} // Callback para cancelar
        loading={loading} // Estado de carregamento
      />
    </div>
  );
}
