"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReminderForm from "@/app/components/display/reminder-form";
import { Navigation } from "@/app/components/navigation/navigation";
import {ReminderInput} from "@/app/schemas/reminderSchema"; // ✅ Importação correta
import ComebackButton from "@/app/components/button/comeback";

export default function Reminder() {
  const router = useRouter();

  const [reminderData, setReminderData] = useState<ReminderInput>({
    date: "",
    time: "00:00",
    reason: "",
    description: "",
});



  return (
    <div
    style={{
      background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
  }}
    >
      <Navigation />

      {/* ✅ Passando corretamente as propriedades para ReminderForm */}
      <ReminderForm
   mode="create"
    reminderData={reminderData}/>
<ComebackButton/>
    </div>
  );
}
