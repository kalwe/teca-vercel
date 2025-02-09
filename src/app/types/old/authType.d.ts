export type LoginData = {
  username: string; // Nome de usuário para login
  password: string; // Senha do usuário
};

export type AuthResponse = {
  token: string; // Token JWT retornado pela API
  id: number; // ID do usuário autenticado
  username: string; // Nome do usuário autenticado
  email: string; // E-mail do usuário autenticado
  role: "admin" | "user" | "manager"; // Papel do usuário no sistema
};

export type User = {
  id: number; // ID único do usuário
  username: string; // Nome de usuário
  email: string; // E-mail do usuário
  role: "admin" | "user" | "manager"; // Papel do usuário no sistema
};

export type AuthContextType = {
  user: User | null; // Dados do usuário autenticado
  isAuthenticated: boolean; // Se o usuário está autenticado
  login: (credentials: LoginData) => Promise<void>; // Função de login
  logout: () => void; // Função de logout
};
