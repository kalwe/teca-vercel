"use client";
import React, { createContext, useContext, useState } from "react";

// Tipos para os dados do formulário
interface FormData {
    pessoaFisica: {
        nome: string;
        cpf: string;
        genero: string;
        estadoCivil: string;
        rg: string;
        orgaoExpedidor: string;
        selectedDate: Date | null;
    };
    funcionario: {
        supervisor: boolean;
        manager: boolean;
        matricula: string;
        admissionDate: Date | null;
        removalDate: Date | null;
        funcao: string;
        encarregado: boolean;
        gerente: boolean;
        ativo: boolean;
    };
    endereco: {
        logradouro: string;
        bairro: string;
        cep: string;
        estado: string;
        municipio: string;
    };
    contato: {
        tipoContato: string;
        informacao: string;
    };
    dadosBancarios: {
        banco: string;
        agencia: string;
        conta: string;
        tipoConta: string;
    };
    vestuario: {
        tamanhoCamisa: string;
        tamanhoCalca: string;
        tamanhoCalcado: string;
    };
}

// Estado inicial do formulário (imutável)
const defaultFormData: Readonly<FormData> = {
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
};

// Tipo do contexto
interface FormDataContextType {
    formData: FormData; // Dados do formulário
    updateFormData: (
        section: keyof FormData,
        data: Partial<FormData[keyof FormData]>
    ) => void; // Atualizar uma seção específica do formulário
    resetFormData: () => void; // Redefinir os dados para o estado inicial
}

// Criação do contexto
const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

// Provedor do contexto
export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>(defaultFormData);

    // Função para atualizar os dados de uma seção específica
    const updateFormData = (section: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...data,
            },
        }));
    };

    // Função para redefinir os dados do formulário
    const resetFormData = () => {
        setFormData(defaultFormData);
    };

    return (
        <FormDataContext.Provider value={{ formData, updateFormData, resetFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

// Hook para usar o contexto do formulário
export const useFormData = (): FormDataContextType => {
    const context = useContext(FormDataContext);
    if (!context) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }
    return context;
};
