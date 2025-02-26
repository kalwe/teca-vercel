export interface HoursBank {
  id: number;
  employee: number;
  hoursWorked: number;
  hoursOvertime: number;
  hoursBalance: number;
  date: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}
