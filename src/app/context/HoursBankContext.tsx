// context/HoursBankContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HoursBankEntry {
  date: ReactNode;
  hours_worked: ReactNode;
  fullName: ReactNode;
  id: string;
  name: string;
  hours: number;
}

interface HoursBankContextType {
  hoursBank: HoursBankEntry[];
  addEntry: (entry: HoursBankEntry) => void;
  updateEntry: (id: string, updatedHours: number) => void;
  removeEntry: (id: string) => void;
}

const HoursBankContext = createContext({} as HoursBankContextType);

export const HoursBankProvider = ({ children }: { children: ReactNode }) => {
  const [hoursBank, setHoursBank] = useState<HoursBankEntry[]>([]);

  const addEntry = (entry: HoursBankEntry) => {
    setHoursBank((prev) => [...prev, entry]);
  };

  const updateEntry = (id: string, updatedHours: number) => {
    setHoursBank((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, hours: updatedHours } : entry))
    );
  };

  const removeEntry = (id: string) => {
    setHoursBank((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <HoursBankContext.Provider value={{ hoursBank, addEntry, updateEntry, removeEntry }}>
      {children}
    </HoursBankContext.Provider>
  );
};

export const useHoursBankContext = (): HoursBankContextType => {
  const context = useContext(HoursBankContext);
  return context;
};
