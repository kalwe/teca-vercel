"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReminderForm from "@/app/components/display/reminder-form";
import { Navigation } from "@/app/components/navigation/navigation";
import { reminderSchema, ReminderInput, sanitizeReminder, ReminderService } from "@/app/schemas/reminderSchema"; // ✅ Importação correta

export default function Reminder() {
  const router = useRouter();

  // 🔹 Estado inicial agora inclui `id`
  const [reminderData, setReminderData] = useState<ReminderInput>({
    id: 0, // ✅ Adicionado para evitar erro
    date: "",
    time: "00:00",
    reason: "",
    description: "",
  });

  /**
   * 🔥 Função para salvar o lembrete
   */
  const handleSave = async (data: ReminderInput) => {
    try {
      const sanitizedData = sanitizeReminder(data);
      const createdReminder = await ReminderService.createReminder(sanitizedData);
      setReminderData(createdReminder); // Atualiza com os dados retornados da API
      router.push("/dashboard-display/");
    } catch (error) {
      console.error("❌ Erro ao criar lembrete:", error);
    }
  };

  return (
    <div>
      <Navigation />

      {/* ✅ Passando corretamente as propriedades para ReminderForm */}
      <ReminderForm
        mode="create"
        reminderData={reminderData}
        setReminderData={setReminderData}
        isEditable={true}
        onSave={handleSave}
        onCancel={() => router.push("/dashboard-display/")}
        schema={reminderSchema}
        sanitize={sanitizeReminder}
        apiService={ReminderService}
      />

      {/* Botão "Voltar" */}
      <div
        style={{ backgroundColor: "#D9D9D963", zIndex: 6 }}
        className="absolute right-[88%] bottom-[70%] text-white p-4 rounded-[21px] h-[12%] shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        <button
          className="w-[30px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/dashboard-display/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
