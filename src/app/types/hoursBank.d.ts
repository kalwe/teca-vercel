export interface HoursBank {
    id: number;
    employee_id: number;
    hours_worked: number;
    hours_overtime: number;
    hours_balance: number;
    date: string;
    created_at?: string | null;
    updated_at?: string | null;
  }
