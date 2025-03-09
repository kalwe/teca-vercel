'use client'

import { User, userInputSchema } from '@/app/schemas/userSchema'
import { AuthService } from '@/app/services/authService'
import { UserService } from '@/app/services/userService'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ZodError } from 'zod'

export default function UserForm({ userData }: { userData: User }) {
  const router = useRouter()
  const { id } = useParams()
  const userId = id ? Number(id) : null
  const isEditMode = userId !== null
  const [user, setUser] = useState<User>({})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditMode && userData) {
      setUser(userData)
    }
  }, [userData])

  const handleInputChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value })

    try {
      userInputSchema.parse({ ...user, [field]: value })
      setErrors({})
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach((e) => {
          if (e.path.length > 0) {
            fieldErrors[e.path[0] as string] = e.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleSave = async () => {
    if (loading) return

    if (!user.email || !user.name) {
      setErrors((prev) => ({
        ...prev,
        // email: !user.email ? "O email é obrigatório." : prev.email,
        name: !user.name ? 'O nome é obrigatório.' : prev.name
      }))
      return
    }

    if (!isEditMode && (!user.password || user.password.length < 6)) {
      setErrors((prev) => ({
        ...prev,
        password: 'A senha deve ter pelo menos 6 caracteres.'
      }))
      return
    }

    if (user.password && user.password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'As senhas não coincidem.'
      }))
      return
    }

    try {
      setLoading(true)
      if (isEditMode) {
        await UserService.updateUser(userId, user)
      } else {
        await AuthService.register(user)
      }
      router.push('/user-display/user-list')
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      alert('Erro ao salvar usuário. Verifique os campos.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/user-display/user-list')
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6'>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          {isEditMode ? 'Atualizar Usuário' : 'Criar Usuário'}
        </h2>
        <div className='space-y-4'>
          {/* Nome */}
          <div>
            <label htmlFor='name' className='block mb-2 text-white'>
              Nome
            </label>
            <input
              type='text'
              id='name'
              value={user.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Digite o nome do usuário'
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block mb-2 text-white'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={user.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Digite o email'
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor='password' className='block mb-2 text-white'>
              {isEditMode ? 'Nova Senha (opcional)' : 'Senha'}
            </label>
            <input
              type='password'
              id='password'
              value={user.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder={
                isEditMode ? 'Digite uma nova senha (opcional)' : 'Digite a senha'
              }
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label htmlFor='confirmPassword' className='block mb-2 text-white'>
              Confirmar Senha
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Confirme a senha'
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className='flex justify-end mt-6'>
          <button
            onClick={handleSave}
            className='px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all'
            disabled={loading}
          >
            {loading ? 'Salvando...' : isEditMode ? 'Atualizar' : 'Salvar'}
          </button>
          <button
            onClick={handleCancel}
            className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all ml-4'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
