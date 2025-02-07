"use client";

import { z } from "zod";
import axios from "axios";

//  Schema de Login
export const useAuthInputSchema = z.object({
  name: z.string().min(5, "O nome deve ter pelo menos 5 caracteres.").max(80, "O nome não pode ter mais de 80 caracteres."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type UseAuthInput = z.infer<typeof useAuthInputSchema>;

//  Schema de Resposta de Autenticação de Login
export const userAuthOutputLoginSchema = z.object({
  current_user_id: z.number(),
  id_authenticated: z.boolean(),
  token: z.string(),
});

export type UserAuthOutputLogin = z.infer<typeof userAuthOutputLoginSchema>;

//  URL da API
const API_URL = "/api/v1/auth"; // Substitua com sua URL real

//  Serviço de Autenticação
export const AuthService = {
  /**
   * Login do usuário
   * @param {UseAuthInput} credentials - Credenciais de login (nome e senha)
   * @returns {Promise<UserAuthOutputLogin>} - Retorna o ID do usuário, status de autenticação e o token
   */
  async login(credentials: UseAuthInput): Promise<UserAuthOutputLogin> {
    try {
      // Valida as credenciais antes de enviar
      const validatedData = useAuthInputSchema.parse(credentials);

      // Envia a requisição para a API
      const response = await axios.post(`${API_URL}/login`, validatedData);

      // Valida a resposta da API antes de usá-la com Zod
      const authResponse = userAuthOutputLoginSchema.parse(response.data);

      // Salva o token no localStorage
      localStorage.setItem("token", authResponse.token);

      return authResponse;
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      throw new Error("Falha no login. Verifique suas credenciais.");
    }
  },

  /**
   * Obtém o token salvo no localStorage
   * @returns {string | null} - Token JWT salvo ou null se não existir
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} - Retorna `true` se o token existir e `false` se não existir
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Logout do usuário (remove o token e redireciona)
   */
  logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redireciona para login após logout
  },
};
