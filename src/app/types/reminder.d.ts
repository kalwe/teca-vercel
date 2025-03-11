export interface Reminder {
  id?: any | null
  date?: any | null
  time?: any | null
  reason?: any | null
  description?: any | null
}
// TODO: remove um tipo e verifica onde usa pra o mesmo
export type ReminderType = {
  id?: any | null
  date?: any | null
  time?: any | null
  reason?: any | null
  description?: any | null
}

export type Reminders = ReminderType[]
