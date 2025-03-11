import { AxiosError } from 'axios'
import {
  UserAuthInput,
  userAuthInputSchema,
  UserAuthResponse,
  userAuthResponseSchema,
} from '../schemas/authSchema'
import {

  userInputSchema,

  userResponseSchema,
} from '../schemas/userSchema'
import api from './api'
import { UserResponse } from '../types/user'

export const AuthService = {
  async register(userInput: any): Promise<UserResponse> {
    try {
      const validUser = userInputSchema.parse(userInput)

      const response = await api.post('/auth/register', validUser)
      if (!response.data.sucess) {
        console.error(response.data.errors)
      }
      const registeredUser = userResponseSchema.parse(response.data)
      return registeredUser
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data)
      }
      console.error('Erro ao autenticar:', error)
      throw new Error('Falha no login. Verifique suas credenciais.')
    }
  },

  async login(credentials: UserAuthInput): Promise<UserAuthResponse> {
    try {
      const validCredentials = userAuthInputSchema.parse(credentials)

      const response = await api.post('/auth/login', validCredentials)

      const authResponse = userAuthResponseSchema.parse(response.data)

      if (authResponse.name == validCredentials.name) {
        if (authResponse.token) {
          localStorage.setItem('id', `${authResponse.id}`)
          localStorage.setItem('name', authResponse.name)
          localStorage.setItem('token', authResponse.token)
          localStorage.setItem('authenticated', `${authResponse.authenticated}`)
          localStorage.setItem('expire', authResponse.expire)
        }
      }

      return authResponse
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data)
      }
      console.error('Erro ao autenticar:', error)
      throw new Error('Falha no login. Verifique suas credenciais.')
    }
  },

  getToken(): string | null {
    const token = localStorage.getItem('token')
    if (!token) {
      return null
    }
    return token
  },

  isAuthenticated(): boolean {
    return localStorage.getItem('authenticated') === 'true'
  },

  /**
   * Logout do usuário (remove o token e redireciona)
   */
  logout(): void {
    // const userLogout = {
    //   id: localStorage.getItem('id'),
    //   name: localStorage.getItem('name'),
    //   token: localStorage.getItem('token'),
    //   authenticated: localStorage.getItem('authenticated'),
    //   expire: localStorage.getItem('expire'),
    // };

    // const response = await api.post('/auth/logout', userLogout);
    // console.info(response.data);
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('authenticated')
    localStorage.removeItem('expire')
    window.location.href = '/' // Redireciona para login após logout
  },
}
