"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { LoginData, User, AuthContextType } from "@/app/types/authType";
import { AuthService } from "@/app/services/not-use/authService";

// ✅ Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider para autenticação e gerenciamento de usuários
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /**
   * 🔥 Recupera usuário e token do `localStorage` ao iniciar
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("⚠ Erro ao recuperar usuário:", error);
        logout();
      }
    }
  }, []);

  /**
   * ✅ Realiza login chamando a API via `AuthService`
   */
  const login = async (credentials: LoginData): Promise<void> => {
    try {
      const response = await AuthService.login(credentials);

      if (!response || !response.token) {
        throw new Error("Resposta inválida do servidor.");
      }

      // 🔥 Armazena token e usuário no `localStorage`
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response));

      setUser({
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("⚠ Erro ao fazer login:", error);
      throw new Error("Credenciais inválidas ou erro na autenticação.");
    }
  };

  /**
   * ✅ Faz logout removendo dados do `localStorage`
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook customizado para consumir o contexto de autenticação
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
};
