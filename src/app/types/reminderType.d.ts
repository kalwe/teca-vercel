export interface Reminder {
  id?: number
  date: string
  time: string
  reason: string
  description?: string
}
// TODO: remove um tipo e verifica onde usa pra o mesmo
export type ReminderType = {
  id?: number
  date: string
  time: string
  reason: string
  description?: string
}

export type Reminders = ReminderType[]
