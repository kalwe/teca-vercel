export interface Reminder {
    id?: number;
    date: string; // Formato: dd/mm/aaaa
    time: string; // Formato: HH:mm
    reason: string;
    description?: string;
  }

  export interface ReminderResponse {
    id: number;
    date: string;
    time: string;
    reason: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }
