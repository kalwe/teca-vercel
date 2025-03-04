"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { reminderSchema, ReminderInput } from "@/app/schemas/reminderSchema";
import { z } from "zod";
import { ReminderService } from "@/app/services/reminderService";
import { format } from "date-fns";

interface ReminderFormProps {
    mode: "create" | "edit";
    reminderData?: ReminderInput;
    onSave?: (data: any) => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({
    mode,
    reminderData,
    onSave,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ReminderInput>({
        date: reminderData?.date || "",
        time: reminderData?.time || "",
        reason: reminderData?.reason || "",
        description: reminderData?.description || "",
    });

    // Inicializa os valores diretamente
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        reminderData?.date ? new Date(reminderData.date) : null
    );
    const [selectedTime, setSelectedTime] = useState<Date | null>(
        reminderData?.time ? new Date(`1970-01-01T${reminderData.time}:00`) : null
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    /**
     * Atualiza os campos e valida os dados em tempo real.
     */
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

    /**
     * Manipula a mudança na Data
     */
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = format(date, "yyyy-MM-dd");
            handleChange("date", formattedDate);
        }
    };

    const handleTimeChange = (time: Date | null) => {
        setSelectedTime(time);
        if (time) {
            const formattedTime = format(time, "HH:mm");
            handleChange("time", formattedTime);
        }
    };

    /**
     * Criar ou Atualizar um Lembrete (POST ou PUT)
     */
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const dataToSubmit = { ...formData };
            const validatedData = reminderSchema.parse(dataToSubmit);
            const savedReminder = await ReminderService.createReminder(validatedData);

            alert("Lembrete criado com sucesso!");
            onSave?.(savedReminder);
            router.push("/dashboard-display/");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((e) => {
                    if (e.path.length > 0) {
                        fieldErrors[e.path[0] as string] = e.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                console.error("Erro ao criar lembrete:", error);
                alert("Erro ao criar lembrete. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
            <div className="w-full max-w-3xl p-6 bg-gray-800 shadow-md rounded-lg border border-gray-700">
                <h1 className="text-2xl font-bold text-white mb-6">
                    {mode === "edit" ? "Editar Lembrete" : "Novo Lembrete"}
                </h1>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="date" className="text-white block mb-1">
                            Selecione a Data:
                        </label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                            placeholderText="Selecione a Data"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>

                    <div>
                        <label htmlFor="time" className="text-white block mb-1">
                            Selecione o Horário:
                        </label>
                        <DatePicker
                            selected={selectedTime}
                            onChange={handleTimeChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Hora"
                            dateFormat="HH:mm"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                            placeholderText="Selecione o Horário"
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                    </div>

                    <div>
                        <label htmlFor="reason" className="text-white block mb-1">
                            Motivo do lembrete:
                        </label>
                        <input
                            type="text"
                            id="reason"
                            value={formData.reason}
                            onChange={(e) => handleChange("reason", e.target.value)}
                            className={`w-full px-4 py-2 rounded-md border ${
                                errors.reason ? "border-red-500" : "border-gray-600"
                            } bg-gray-700 text-white placeholder-gray-400`}
                            placeholder="Digite o motivo"
                        />
                        {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="text-white block mb-1">
                            Descrição:
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className={`w-full px-4 py-2 rounded-md border ${
                                errors.description ? "border-red-500" : "border-gray-600"
                            } bg-gray-700 text-white placeholder-gray-400`}
                            placeholder="Digite a descrição do lembrete"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div className="flex justify-between">
                        <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500">
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500">
                            Salvar Lembrete
                        </button>
                        {loading && (
                            <p className="text-gray-300 text-center">Carregando...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReminderForm;
