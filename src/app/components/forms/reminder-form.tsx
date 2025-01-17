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
          id: Date.now().toString(), // Gera um ID único
          date: selectedDate,
          time: reminderTime,
          reason: reminderReason,
        };

        addReminder(newReminder);

        router.push('/dashboard-display/');
      };

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Permitir apagar com backspace
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Formatar para dd/mm/aaaa enquanto o usuário digita
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

        // Limitar ao formato dd/mm/aaaa
        if (value.length > 10) value = value.slice(0, 10);

        setSelectedDate(value);
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
            <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6">
                <div className="bg-[#829171] w-[100%] h-[100%] rounded-[26px] relative">
                    <div
                        style={{ zIndex: 10, position: 'absolute', top: '10%', left: '8%' }}
                        className="bg-[#7A7A7A] w-[87%] h-[80%] rounded-[18px] flex flex-col items-start justify-start p-6"
                    >
                        <h1 className="text-white text-xl mb-4">Lembretes</h1>
                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-full">
                            <div>
                                <label htmlFor="date" className="text-white block mb-1">
                                    Selecione o dia:
                                </label>
                                <input
                                    type="text"
                                    id="date"
                                    className="w-full px-4 py-2 rounded-md border"
                                    placeholder="dd/mm/aaaa"
                                    value={selectedDate}
                                    onChange={handleDateInputChange}
                                    maxLength={10} // Limita ao formato dd/mm/aaaa
                                />
                            </div>
                            <div>
                                <label htmlFor="reason" className="text-white block mb-1">
                                    Motivo do lembrete:
                                </label>
                                <input
                                    type="text"
                                    id="reason"
                                    className="w-full px-4 py-2 rounded-md border"
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
        className="w-full px-4 py-2 rounded-md border bg-white text-gray-700"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
    >
        {/* Placeholder */}
        <option value="" disabled>
            00:00
        </option>
        {/* Opções de horários */}
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
                                    className="w-full px-4 py-2 rounded-md border"
                                    placeholder="Digite a descrição do lembrete"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600"
                            >
                                Salvar Lembrete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReminderForm;
