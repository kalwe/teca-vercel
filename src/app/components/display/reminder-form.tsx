"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useReminderContext } from "@/app/context/ReminderContext";
import { reminderSchema, ReminderInput, sanitizeReminder, ReminderService, ReminderFormProps } from "@/app/schemas/reminderSchema";

const ReminderForm: React.FC<ReminderFormProps> = ({
    mode,
    reminderData,
    setReminderData,
    isEditable,
    onSave,
    onCancel,
}) => {
    const { addReminder } = useReminderContext();
    const router = useRouter();

    // 🔹 Configuração do formulário com validação via Zod
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ReminderInput>({
        resolver: zodResolver(reminderSchema),
        defaultValues: {
            date: "",
            time: "00:00",
            reason: "",
            description: "",
        },
    });

    /**
     * 🔹 Submissão do formulário com validação e sanitização
     */
    const onSubmit = async (data: ReminderInput) => {
        try {
            const sanitizedData = sanitizeReminder(data);
            const createdReminder = await ReminderService.createReminder(sanitizedData); // ✅ Envio validado e sanitizado
            addReminder(createdReminder);
            router.push("/dashboard-display/");
        } catch (error) {
            console.error("❌ Erro ao criar lembrete:", error);
        }
    };

    /**
     * 🔹 Manipulação da entrada de data no formato `dd/mm/aaaa`
     */
    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5, 9);
        if (value.length > 10) value = value.slice(0, 10);

        setValue("date", value, { shouldValidate: true });
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen"
            style={{
                background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
            }}
        >
            <div className="w-full max-w-3xl p-6 bg-gray-800 shadow-md rounded-lg border border-gray-700">
                <h1 className="text-2xl font-bold text-white mb-6">Lembretes</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Campo de Data */}
                    <div>
                        <label htmlFor="date" className="text-white block mb-1">
                            Selecione o dia:
                        </label>
                        <input
                            type="text"
                            id="date"
                            {...register("date")}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                            placeholder="dd/mm/aaaa"
                            onChange={handleDateInputChange}
                            maxLength={10}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    {/* Campo de Motivo */}
                    <div>
                        <label htmlFor="reason" className="text-white block mb-1">
                            Motivo do lembrete:
                        </label>
                        <input
                            type="text"
                            id="reason"
                            {...register("reason")}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                            placeholder="Digite o motivo"
                        />
                        {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                    </div>

                    {/* Campo de Horário */}
                    <div>
                        <label htmlFor="time" className="text-white block mb-1">
                            Hora do lembrete:
                        </label>
                        <select
                            id="time"
                            {...register("time")}
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
                        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                    </div>

                    {/* Campo de Descrição */}
                    <div>
                        <label htmlFor="description" className="text-white block mb-1">
                            Descrição:
                        </label>
                        <textarea
                            id="description"
                            {...register("description")}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                            placeholder="Digite a descrição do lembrete"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Botão de Salvar */}
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
