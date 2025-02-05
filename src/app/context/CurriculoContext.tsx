"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Cv } from "../types/cv";
import { CvService } from "../services/cvService";

type CvContextData = {
  cvs: Cv[];
  loading: boolean;
  error: string | null;
  addCv: (cv: Cv) => Promise<void>;
  updateCv: (id: number, cv: Partial<Cv>) => Promise<void>;
  deleteCv: (id: number) => Promise<void>;
};

const CvContext = createContext<CvContextData | undefined>(undefined);

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvs, setCvs] = useState<Cv[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar currículos da API na montagem do contexto
  useEffect(() => {
    const fetchCvs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await CvService.getAllCvs();
        setCvs(data);
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
  const addCv = useCallback(async (cv: Cv) => {
    setLoading(true);
    setError(null);
    try {
      const newCv = await CvService.createCv(cv);
      setCvs((prev) => [...prev, newCv]);
    } catch (error) {
      console.error("Erro ao adicionar currículo:", error);
      setError("Erro ao adicionar currículo.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar um currículo existente
  const updateCv = useCallback(async (id: number, updatedCv: Partial<Cv>) => {
    if (!id) {
      console.error("Erro: ID do currículo é obrigatório.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const existingCv = cvs.find((cv) => cv.id === id);
      if (!existingCv) throw new Error("Currículo não encontrado.");

      // Garante que `id` nunca será `undefined`
      const updatedData: Cv = { ...existingCv, ...updatedCv, id };

      const newCv = await CvService.updateCv(id, updatedData);
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
      await CvService.deleteCv(id);
      setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== id));
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
