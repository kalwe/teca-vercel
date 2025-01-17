'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VagasContextProps, Vaga } from '../types/employee';


const VagasContext = createContext<VagasContextProps | undefined>(undefined);

export const VagasProvider = ({ children }: { children: ReactNode }) => {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  // Helper para carregar vagas do localStorage
  const loadVagas = () => {
    try {
      const storedVagas = localStorage.getItem('vagas');
      if (storedVagas) {
        const parsedVagas: Vaga[] = JSON.parse(storedVagas);
        setVagas(parsedVagas);
      }
    } catch (error) {
      console.error('Erro ao carregar vagas do localStorage:', error);
    }
  };

  // Helper para salvar vagas no localStorage
  const saveVagas = () => {
    try {
      localStorage.setItem('vagas', JSON.stringify(vagas));
    } catch (error) {
      console.error('Erro ao salvar vagas no localStorage:', error);
    }
  };

  // Carrega vagas ao montar o componente
  useEffect(() => {
    loadVagas();
  }, []);

  // Salva vagas sempre que o estado muda
  useEffect(() => {
    saveVagas();
  }, [vagas]);

  // Adiciona ou atualiza uma vaga
  const addVaga = (newVaga: Vaga) => {
    setVagas((prevVagas) => {
      const exists = prevVagas.some((vaga) => vaga.vaga === newVaga.vaga);
      if (exists) {
        alert(`O cargo "${newVaga.vaga}" já existe na lista.`);
        return prevVagas; // Não adiciona vaga duplicada
      }
      return [...prevVagas, newVaga];
    });
    console.log('Nova vaga adicionada:', newVaga);
  };


  // Atualiza uma vaga pelo índice
  const updateVaga = (index: number, updates: Partial<Vaga>) => {
    setVagas((prevVagas) =>
      prevVagas.map((vaga, i) => (i === index ? { ...vaga, ...updates } : vaga))
    );
    console.log(`Vaga no índice ${index} atualizada.`);
  };

  // Remove uma vaga pelo índice
  const removeVaga = (index: number) => {
    setVagas((prevVagas) => prevVagas.filter((_, i) => i !== index));
    console.log(`Vaga no índice ${index} removida.`);
  };

  return (
    <VagasContext.Provider value={{ vagas, addVaga, updateVaga, removeVaga }}>
      {children}
    </VagasContext.Provider>
  );
};

// Hook customizado para acessar o VagasContext
export const useVagasContext = () => {
  const context = useContext(VagasContext);
  if (!context) {
    throw new Error('useVagasContext must be used within a VagasProvider');
  }
  return context;
};
