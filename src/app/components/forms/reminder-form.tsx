'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReminderContext } from '@/app/context/ReminderContext';

const ReminderForm: React.FC = () => {
    const { addReminder } = useReminderContext();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [reminderReason, setReminderReason] = useState<string>('');
    const [reminderTime, setReminderTime] = useState<string>('00:00');
    const [description, setDescription] = useState<string>('');
    const router = useRouter();

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newReminder = {
            id: Date.now().toString(),
            date: selectedDate,
            time: reminderTime,
            reason: reminderReason,
        };

        addReminder(newReminder);

        router.push('/dashboard-display/');
    };

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        value = value.replace(/\D/g, ''); // Remove non-numeric characters

        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

        if (value.length > 10) value = value.slice(0, 10);

        setSelectedDate(value);
    };

    return (
        <div className="flex justify-center items-center min-h-screen"
        style={{
            background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))"
          }}
        >
            <div className="w-full max-w-3xl p-6 bg-gray-800 shadow-md rounded-lg border border-gray-700">
                <h1 className="text-2xl font-bold text-white mb-6">Lembretes</h1>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="date" className="text-white block mb-1">
                            Selecione o dia:
                        </label>
                        <input
                            type="text"
                            id="date"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                            placeholder="dd/mm/aaaa"
                            value={selectedDate}
                            onChange={handleDateInputChange}
                            maxLength={10}
                        />
                    </div>
                    <div>
                        <label htmlFor="reason" className="text-white block mb-1">
                            Motivo do lembrete:
                        </label>
                        <input
                            type="text"
                            id="reason"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                            placeholder="Digite o motivo"
                            value={reminderReason}
                            onChange={(e) => setReminderReason(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="text-white block mb-1">
                            Hora do lembrete:
                        </label>
                        <select
                            id="time"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                        >
                            <option value="" disabled>
                                Selecione um horário
                            </option>
                            {Array.from({ length: 48 }).map((_, i) => {
                                const hour = Math.floor(i / 2)
                                    .toString()
                                    .padStart(2, '0');
                                const minutes = i % 2 === 0 ? '00' : '30';
                                return (
                                    <option key={`${hour}:${minutes}`} value={`${hour}:${minutes}`}>
                                        {`${hour}:${minutes}`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="text-white block mb-1">
                            Descrição:
                        </label>
                        <textarea
                            id="description"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                            placeholder="Digite a descrição do lembrete"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-transform transform hover:scale-105"
                        >
                            Salvar Lembrete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReminderForm;
