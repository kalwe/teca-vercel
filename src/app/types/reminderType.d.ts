export interface Reminder {
  id?: number
  date: string
  time: string
  reason: string
  description?: string
}

export type ReminderType = {
  id?: number
  date: string
  time: string
  reason: string
  description?: string
}

export type Reminders = ReminderType[]
