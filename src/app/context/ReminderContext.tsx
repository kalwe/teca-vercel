'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Reminder, ReminderContextData } from '../types/employee';


const ReminderContext = createContext<ReminderContextData | undefined>(
  undefined
);

export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const addReminder = (reminder: Reminder) => {
    setReminders((prev) => [...prev, reminder]);
  };

  // Remoção automática de lembretes expirados
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDate = now.toLocaleDateString('pt-BR');
      const currentTime = now.toTimeString().slice(0, 5);

      setReminders((prevReminders) =>
        prevReminders.filter(
          (reminder) =>
            !(reminder.date === currentDate && reminder.time <= currentTime)
        )
      );
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <ReminderContext.Provider value={{ reminders, addReminder }}>
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
