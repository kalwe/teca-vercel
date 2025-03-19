import { UserAuthInput } from '../schemas/authSchema'

export type AuthResponse = {
  id?: any | null;
  name?: any | null;
  token?: any | null;
  authenticated?;
  expires?: any | null;
};

export type User = {
  id?: any | null;
  name?: any | null;
  email?: any | null;
  password?: any | null;
  role?: any | null;
};

export type AuthContextType = {
  user?: User | null;
  isAuthenticated?: any | null;
  login: (credentials: UserAuthInput) => Promise<void>;
  logout: () => void;
};
