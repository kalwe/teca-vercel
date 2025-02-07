"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cvSchema, CvService } from "../schemas/cvSchema"; // Importando diretamente o cvSchema

type CvContextData = {
  cvs: any[]; // Usando 'any' para acomodar os dados do cvSchema
  loading: boolean;
  error: string | null;
  addCv: (cv: any) => Promise<void>;
  updateCv: (id: number, cv: Partial<any>) => Promise<void>;
  deleteCv: (id: number) => Promise<void>;
};

const CvContext = createContext<CvContextData | undefined>(undefined);

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar currículos da API na montagem do contexto
  useEffect(() => {
    const fetchCvs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await CvService.getAllCvs(); // Método direto do cvSchema
        setCvs(data); // Atualiza o estado com os currículos obtidos
      } catch (error) {
        console.error("Erro ao buscar currículos:", error);
        setError("Falha ao carregar currículos.");
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, []);

  // Adicionar um novo currículo
  const addCv = useCallback(async (cv: any) => {
    setLoading(true);
    setError(null);
    try {
      const newCv = await CvService.createCv(cv); // Criando currículo com o serviço CvService
      setCvs((prev) => [...prev, newCv]); // Atualiza o estado com o novo currículo
    } catch (error) {
      console.error("Erro ao adicionar currículo:", error);
      setError("Erro ao adicionar currículo.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar um currículo existente
  const updateCv = useCallback(async (id: number, updatedCv: Partial<any>) => {
    if (!id) {
      console.error("Erro: ID do currículo é obrigatório.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const existingCv = cvs.find((cv) => cv.id === id);
      if (!existingCv) throw new Error("Currículo não encontrado.");

      const updatedData = { ...existingCv, ...updatedCv, id };

      const newCv = await CvService.updateCv(id, updatedData); // Atualizando currículo com CvService
      setCvs((prevCvs) =>
        prevCvs.map((cv) => (cv.id === id ? { ...cv, ...newCv } : cv))
      );
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error);
      setError("Erro ao atualizar currículo.");
    } finally {
      setLoading(false);
    }
  }, [cvs]);

  // Remover um currículo
  const deleteCv = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await CvService.deleteCv(id); // Deletando currículo com CvService
      setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== id)); // Atualiza a lista de currículos
    } catch (error) {
      console.error("Erro ao deletar currículo:", error);
      setError("Erro ao deletar currículo.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CvContext.Provider value={{ cvs, loading, error, addCv, updateCv, deleteCv }}>
      {children}
    </CvContext.Provider>
  );
};

export const useCvContext = (): CvContextData => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCvContext deve ser usado dentro de um CvProvider.");
  }
  return context;
};
