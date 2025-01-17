'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Curriculo, CurriculoContextData } from '../types/employee';


const CurriculoContext = createContext<CurriculoContextData | undefined>(undefined);

export const CurriculoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);

  // Load saved curricula from localStorage on initial render
  useEffect(() => {
    const savedCurriculos = localStorage.getItem('curriculos');
    if (savedCurriculos) {
      setCurriculos(JSON.parse(savedCurriculos));
    }
  }, []);

  // Save curricula to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('curriculos', JSON.stringify(curriculos));
  }, [curriculos]);

  // Add a new curriculum
  const addCurriculo = (curriculo: Curriculo) => {
    setCurriculos((prev) => [...prev, curriculo]);
  };

  // Update an existing curriculum
  const updateCurriculo = (updatedCurriculo: Curriculo) => {
    setCurriculos((prevCurriculos) =>
      prevCurriculos.map((curriculo) =>
        curriculo.id === updatedCurriculo.id ? { ...curriculo, ...updatedCurriculo } : curriculo
      )
    );
  };

  return (
    <CurriculoContext.Provider value={{ curriculos, addCurriculo, updateCurriculo }}>
      {children}
    </CurriculoContext.Provider>
  );
};

export const useCurriculoContext = (): CurriculoContextData => {
  const context = useContext(CurriculoContext);
  if (!context) {
    throw new Error('useCurriculoContext must be used within a CurriculoProvider');
  }
  return context;
};
