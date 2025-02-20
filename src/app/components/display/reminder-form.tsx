"use client";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReminderContext } from "@/app/context/ReminderContext";
import { reminderSchema, ReminderInput, ReminderService, ReminderFormProps } from "@/app/schemas/reminderSchema";
import { z } from "zod";

const ReminderForm: React.FC<ReminderFormProps> = ({
    mode,
    reminderData,
    onSave,
    onCancel,
}) => {
    const { addReminder } = useReminderContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ReminderInput>(reminderData || {
        date: "",
        time: "00:00",
        reason: "",
        description: "",
    });
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
     * Formata a data ao digitar.
     */
    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5, 9);
        if (value.length > 10) value = value.slice(0, 10);

        handleChange("date", value);
    };

    /**
     * 🚀 Criar ou Atualizar um Lembrete (POST ou PUT)
     */
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const validatedData = reminderSchema.parse(formData);

            let savedReminder;
            if (mode === "create") {
                savedReminder = await ReminderService.createReminder(validatedData);
                addReminder(savedReminder);
            } else {
                savedReminder = await ReminderService.updateReminder(reminderData?.id, validatedData);
            }

            alert("✅ Lembrete salvo com sucesso!");
            onSave?.(savedReminder);
            router.push("/dashboard-display/");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((e) => {
                    fieldErrors[e.path[0] as string] = e.message;
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
                    {/* Campo de Data */}
                    <div>
                        <label htmlFor="date" className="text-white block mb-1">
                            Selecione o dia:
                        </label>
                        <input
                            type="text"
                            id="date"
                            value={formData.date}
                            className={`w-full px-4 py-2 rounded-md border ${
                                errors.date ? "border-red-500" : "border-gray-600"
                            } bg-gray-700 text-white placeholder-gray-400`}
                            placeholder="dd/mm/aaaa"
                            onChange={handleDateInputChange}
                            maxLength={10}
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

                    {/* Campo de Hora */}
                    <div>
                        <label htmlFor="time" className="text-white block mb-1">
                            Hora do lembrete:
                        </label>
                        <select
                            id="time"
                            value={formData.time}
                            onChange={(e) => handleChange("time", e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                        >
                            {Array.from({ length: 48 }).map((_, i) => {
                                const hour = Math.floor(i / 2).toString().padStart(2, "0");
                                const minutes = i % 2 === 0 ? "00" : "30";
                                return (
                                    <option key={`${hour}:${minutes}`} value={`${hour}:${minutes}`}>
                                        {`${hour}:${minutes}`}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
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
                        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500">
                            Salvar Lembrete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReminderForm;
