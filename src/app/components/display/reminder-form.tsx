"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { reminderSchema, ReminderInput, ReminderFormProps } from "@/app/schemas/reminderSchema";
import { z } from "zod";
import { ReminderService } from "@/app/services/reminderService";
import { format, parseISO } from "date-fns";

const ReminderForm: React.FC<ReminderFormProps> = ({
    mode,
    reminderData,
    onSave,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ReminderInput>(reminderData || {
        date: "", // 🔥 Agora só tem `date`
        reason: "",
        description: "",
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 🔥 Estado para o DatePicker
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
     *  Manipula a mudança no DatePicker
     */
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
            handleChange("date", formattedDate); // 🔥 Salva a data completa no estado
        }
    };

    /**
     *  Criar ou Atualizar um Lembrete (POST ou PUT)
     */
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const dataToSubmit = { ...formData };

            // 🔥 Valida os dados usando o reminderSchema
            const validatedData = reminderSchema.parse(dataToSubmit);

            // 🔥 Faz o POST para criar o lembrete
            const savedReminder = await ReminderService.createReminder(validatedData);

            alert("✅ Lembrete criado com sucesso!");
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
                console.error("❌ Erro ao criar lembrete:", error);
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

                {/* Formulário */}
                <div className="space-y-6">
                    {/* DatePicker - Combina Data e Hora */}
                    <div>
                        <label htmlFor="date" className="text-white block mb-1">
                            Selecione Data e Hora:
                        </label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            dateFormat="dd/MM/yyyy HH:mm"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                            placeholderText="Selecione Data e Hora"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>

                    {/* Campo de Motivo */}
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

                    {/* Campo de Descrição */}
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

                    {/* Botões de Ação */}
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
