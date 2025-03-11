export interface HoursBank {
  id: number;
  hoursWorked: number;
  hoursOvertime: number;
  hoursBalance: number;
  date: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  employeeId?: any | null;
}
