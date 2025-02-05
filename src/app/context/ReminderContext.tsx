'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Reminder } from '../types/reminderType';

interface ReminderContextData {
    reminders: Reminder[];
    addReminder: (reminder: Reminder) => void;
    setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
}

const ReminderContext = createContext<ReminderContextData | undefined>(undefined);

export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [reminders, setReminders] = useState<Reminder[]>([]);

    const addReminder = (reminder: Reminder) => {
        setReminders((prev) => [...prev, reminder]);
        localStorage.setItem('reminders', JSON.stringify([...reminders, reminder]));
    };

    useEffect(() => {
        const storedReminders = localStorage.getItem('reminders');
        if (storedReminders) {
            setReminders(JSON.parse(storedReminders));
        }
    }, []);

    // Remoção automática de lembretes expirados
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

export const useReminderContext = (): ReminderContextData => {
    const context = useContext(ReminderContext);
    if (!context) {
        throw new Error('useReminderContext must be used within a ReminderProvider');
    }
    return context;
};
