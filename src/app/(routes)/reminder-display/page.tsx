

import ComebackButton from "@/app/components/button/comeback"
import ReminderForm from "@/app/components/display/reminder-form"
import { Navigation } from "@/app/components/navigation/navigation"


export default function Reminder() {
  return (
    <div
    style={{
      background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
  }}>
      <Navigation />
      <ReminderForm/>
      <ComebackButton/>
    </div>
  );
}
