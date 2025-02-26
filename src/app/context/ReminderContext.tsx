'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ReminderInput } from '@/app/schemas/reminderSchema'
import axios from 'axios'

const API_URL = "https://api.example.com/reminders"

interface ReminderContextData {
    reminders: ReminderInput[]
    addReminder: (reminder: ReminderInput) => void
    setReminders: React.Dispatch<React.SetStateAction<ReminderInput[]>>
}

const ReminderContext = createContext<ReminderContextData | undefined>(undefined)

export const ReminderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [reminders, setReminders] = useState<ReminderInput[]>([])

    const addReminder = async (reminder: ReminderInput) => {
        try {
            // Envia o lembrete para o backend
            const response = await axios.post(API_URL, reminder)
            const validatedReminder = response.data // Considerando que a API retorna os dados validados

            // Atualiza o estado e salva no localStorage
            setReminders((prev) => {
                const updatedReminders = [...prev, validatedReminder]
                localStorage.setItem('reminders', JSON.stringify(updatedReminders))
                return updatedReminders
            })
        } catch (error) {
            console.error('Erro ao adicionar lembrete:', error)
        }
    }

    // useEffect(() => {
    //     const storedReminders = localStorage.getItem('reminders')
    //     if (storedReminders) {
    //         const parsedReminders = JSON.parse(storedReminders)
    //         const Reminders = parsedReminders.map((reminder) => reminder)
    //         setReminders(Reminders)
    //     }
    // }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const currentDate = now.toLocaleDateString('pt-BR')
            const currentTime = now.toTimeString().slice(0, 5)

            setReminders((prevReminders) => {
                const filteredReminders = prevReminders.filter(
                    (reminder) => !(reminder.date === currentDate && reminder.time <= currentTime)
                )
                localStorage.setItem('reminders', JSON.stringify(filteredReminders))
                return filteredReminders
            })
        }, 60000) // Verifica a cada minuto

        return () => clearInterval(interval)
    }, [])

    return (
        <ReminderContext.Provider value={{ reminders, addReminder, setReminders }}>
            {children}
        </ReminderContext.Provider>
    )
}

export const useReminderContext = (): ReminderContextData => {
    const context = useContext(ReminderContext)
    if (!context) {
        throw new Error('useReminderContext deve ser usado dentro de um ReminderProvider')
    }
    return context
}
