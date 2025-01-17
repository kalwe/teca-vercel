"use client";

import React, { createContext, useContext, useState } from "react";
import { FormData, FormDataContextType } from "../types/employee";

// Define types for the form data structure


// Default initial form data state
const defaultFormData: Readonly<FormData> = {
    id: undefined,
    pessoaFisica: {
      nome: "",
      cpf: "",
      genero: "",
      estadoCivil: "",
      rg: "",
      orgaoExpedidor: "",
      selectedDate: null,
    },
    funcionario: {
      cargo: "",
      salario: 0,
      dataContratacao: "",
      supervisor: false,
      manager: false,
      matricula: "",
      admissionDate: null,
      removalDate: null,
      funcao: "",
      encarregado: false,
      gerente: false,
      ativo: true,
    },
    endereco: {
      logradouro: "",
      bairro: "",
      cep: "",
      estado: "",
      municipio: "",
    },
    contato: {
      tipoContato: "",
      informacao: "",
    },
    dadosBancarios: {
      banco: "",
      agencia: "",
      conta: "",
      tipoConta: "",
    },
    vestuario: {
      tamanhoCamisa: "",
      tamanhoCalca: "",
      tamanhoCalcado: "",
    },
    // Adicionando as propriedades ausentes
    address: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
    contact: {
      telefone: "",
      email: "",
    },
    bank: {
      banco: "",
      agencia: "",
      conta: "",
    },
  };



// Create the context
const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

// Provider component
export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>(defaultFormData);

   // Update a single field in a specific section
const updateField = <K extends keyof FormData>(
    section: K,
    field: keyof FormData[K],
    value: FormData[K][keyof FormData[K]]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...((prev[section] as Record<string, any>) || {}), // Ensure the section is an object
        [field]: value,
      },
    }));
  };

  // Update an entire section
  const updateSection = <K extends keyof FormData>(
    section: K,
    data: Partial<FormData[K]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...((prev[section] as Record<string, any>) || {}), // Ensure the section is an object
        ...data,
      },
    }));
  };


    // Reset the form data to its default state
    const resetFormData = () => {
        setFormData(defaultFormData);
    };

    return (
        <FormDataContext.Provider value={{ formData, updateField, updateSection, resetFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

// Hook for using the form data context
export const useFormData = (): FormDataContextType => {
    const context = useContext(FormDataContext);
    if (!context) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }
    return context;
};
