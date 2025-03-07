"use client";

import { ReminderInput, reminderSchema } from "@/app/schemas/reminderSchema"
import { ReminderService } from "@/app/services/reminderService"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { z } from "zod"


export default function ReminderForm ()  {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ReminderInput>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        formData?.date ? new Date(formData.date) : null
    );
    const [selectedTime, setSelectedTime] = useState<Date | null>(
    formData?.time ? new Date(`1970-01-01T${formData.time.padStart(5, "0")}:00`) : null
);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleChange = <K extends keyof ReminderInput>(field: K, value: ReminderInput[K]) => {
    const updatedData = { ...formData, [field]: value };
       try {
         reminderSchema.parse(updatedData);
         setErrors({});
       } catch (err) {
         if (err instanceof z.ZodError) {
           const fieldErrors: Record<string, string> = {};
           err.errors.forEach((e) => {
             if (e.path.length > 0) {
               fieldErrors[e.path[0] as string] = e.message;
             }
           });
           setErrors(fieldErrors);
         }
       }

       setFormData(updatedData);
     };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            handleChange("date", format(date, "yyyy-MM-dd"));
        }
    };

    const handleTimeChange = (time: Date | null) => {
        setSelectedTime(time);
        if (time) {
            handleChange("time", format(time, "HH:mm"));
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const validatedData = reminderSchema.parse(formData);
            await ReminderService.createReminder(validatedData);
            router.push("/dashboard-display/");
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(error.format() as unknown as Record<string, string>);
            } else {
                console.error("Erro ao criar lembrete:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
            <div className="w-full max-w-3xl p-6 bg-gray-800 shadow-md rounded-lg border border-gray-700">
                <h1 className="text-2xl font-bold text-white mb-6">
                    Novo Lembrete
                </h1>
                <div className="space-y-6">
                    <div>
                        <label className="text-white block mb-1">Data:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>
                    <div>
                        <label className="text-white block mb-1">Horário:</label>
                        <DatePicker
                            selected={selectedTime}
                            onChange={handleTimeChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Hora"
                            dateFormat="HH:mm"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                    </div>
                    <div>
                        <label className="text-white block mb-1">Motivo:</label>
                        <input
                            type="text"
                            value={formData?.reason}
                            onChange={(e) => handleChange("reason", e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-white block mb-1">Descrição:</label>
                        <textarea
                            value={formData?.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500">
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500"
                        >
                            Salvar Lembrete
                        </button>
                        {loading && <p className="text-gray-300 text-center">Carregando...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
