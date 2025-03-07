import { Role } from '@/app/schemas/authSchema';
import { UserAuthInput } from '../schemas/authSchema';

export type AuthResponse = {
  id: number;
  name: string;
  token: string;
  authenticated;
  expires: string;
};

export type User = {
  id: number;
  name: string;
  email?: string;
  password?: string;
  role?: Role;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: UserAuthInput) => Promise<void>;
  logout: () => void;
};
