import { LoginData, AuthResponse } from "../../types/authType";
const API_URL = "/api/v1/auth"; // ✅ Centraliza a URL base

export const AuthService = {
  /**
   * 🔐 Login do usuário
   * @param {LoginData} credentials - Credenciais de login (usuário e senha)
   * @returns {Promise<AuthResponse>} - Retorna token e username se autenticado
   */
  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Falha no login. Verifique suas credenciais.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // ✅ Salva o token localmente
      return data;
    } catch (error) {
      console.error("❌ Erro ao autenticar:", error);
      throw error;
    }
  },

  /**
   * ✅ Obtém o token salvo no localStorage
   * @returns {string | null} - Token JWT salvo ou null se não existir
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  },

  /**
   * ✅ Verifica se o usuário está autenticado
   * @returns {boolean} - Retorna `true` se o token existir e `false` se não existir
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * ❌ Logout do usuário (remove o token e redireciona)
   */
  logout(): void {
    localStorage.removeItem("token"); // ✅ Remove o token
    window.location.href = "/"; // ✅ Redireciona para login após logout
  },
};
