'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ReminderInput, sanitizeReminder } from '@/app/schemas/reminderSchema'; // 🔥 Importando ReminderInput e sanitizeReminder
import axios from 'axios';

const API_URL = "https://api.example.com/reminders"; // 🚀 Substitua pela URL real

interface ReminderContextData {
    reminders: ReminderInput[];
    addReminder: (reminder: ReminderInput) => void;
    setReminders: React.Dispatch<React.SetStateAction<ReminderInput[]>>;
}

const ReminderContext = createContext<ReminderContextData | undefined>(undefined);

export const ReminderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [reminders, setReminders] = useState<ReminderInput[]>([]);

    // 🔹 Função para adicionar um novo lembrete
    const addReminder = async (reminder: ReminderInput) => {
        try {
            const sanitizedReminder = sanitizeReminder(reminder); // 🔥 Sanitizando antes de adicionar
            // Envia o lembrete para o backend
            const response = await axios.post(API_URL, sanitizedReminder);
            const validatedReminder = response.data; // Considerando que a API retorna os dados validados

            // Atualiza o estado e salva no localStorage
            setReminders((prev) => {
                const updatedReminders = [...prev, validatedReminder];
                localStorage.setItem('reminders', JSON.stringify(updatedReminders));
                return updatedReminders;
            });
        } catch (error) {
            console.error('⚠ Erro ao adicionar lembrete:', error);
        }
    };

    // 🔹 Carrega os lembretes do localStorage quando o componente é montado
    useEffect(() => {
        const storedReminders = localStorage.getItem('reminders');
        if (storedReminders) {
            const parsedReminders = JSON.parse(storedReminders);
            // 🔥 Sanitizando os lembretes carregados
            const sanitizedReminders = parsedReminders.map((reminder: any) => sanitizeReminder(reminder));
            setReminders(sanitizedReminders);
        }
    }, []);

    // 🔹 Remoção automática de lembretes expirados a cada minuto
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentDate = now.toLocaleDateString('pt-BR');
            const currentTime = now.toTimeString().slice(0, 5);

            setReminders((prevReminders) => {
                const filteredReminders = prevReminders.filter(
                    (reminder) => !(reminder.date === currentDate && reminder.time <= currentTime)
                );
                localStorage.setItem('reminders', JSON.stringify(filteredReminders));
                return filteredReminders;
            });
        }, 60000); // Verifica a cada minuto

        return () => clearInterval(interval);
    }, []);

    return (
        <ReminderContext.Provider value={{ reminders, addReminder, setReminders }}>
            {children}
        </ReminderContext.Provider>
    );
};

// 🔹 Hook personalizado para acessar o contexto de lembretes
export const useReminderContext = (): ReminderContextData => {
    const context = useContext(ReminderContext);
    if (!context) {
        throw new Error('useReminderContext deve ser usado dentro de um ReminderProvider');
    }
    return context;
};
