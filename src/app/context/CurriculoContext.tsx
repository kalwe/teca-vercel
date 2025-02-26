"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { ResumeService } from "../services/resumeService"

type ResumeContextData = {
  resumes: [] // Usando '' para acomodar os dados do resumeSchema
  loading: boolean
  error: string | null
  addResume: (resume: any) => Promise<void>
  updateResume: (id: number, resume: any) => Promise<void>
  deleteResume: (id: number) => Promise<void>
}

const ResumeContext = createContext<ResumeContextData | undefined>(undefined)

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Carregar currículos da API na montagem do contexto
  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await ResumeService.getAllResumes() // Método direto do resumeSchema
        setResumes(data) // Atualiza o estado com os currículos obtidos
      } catch (error) {
        console.error("Erro ao buscar currículos:", error)
        setError("Falha ao carregar currículos.")
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()
  }, [])

  // Adicionar um novo currículo
  const addResume = useCallback(async (resume: any) => {
    setLoading(true)
    setError(null)
    try {
      const newResume = await ResumeService.createResume(resume) // Criando currículo com o serviço ResumeService
      setResumes((prev) => ({...prev, newResume})) // Atualiza o estado com o novo currículo
    } catch (error) {
      console.error("Erro ao adicionar currículo:", error)
      setError("Erro ao adicionar currículo.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Atualizar um currículo existente
  const updateResume = useCallback(async (id: number, updatedResume: any) => {
    if (!id) {
      console.error("Erro: ID do currículo é obrigatório.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // const existingResume = resumes.find((resume) => resume.id === id)
      // if (!existingResume) throw new Error("Currículo não encontrado.")

      // const updatedData = { existingResume, ...updatedResume, id }

      // const newResume = await ResumeService.updateResume(id, updatedData) // Atualizando currículo com ResumeService
      // setResumes((prevResumes) =>
      //   prevResumes.map((resume) => (resume.id === id ? { ...resume, ...newResume } : resume))
      // )
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error)
      setError("Erro ao atualizar currículo.")
    } finally {
      setLoading(false)
    }
  }, [resumes])

  // Remover um currículo
  const deleteResume = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      const deletedResume = await ResumeService.deleteResume(id) // Deletando currículo com ResumeService
      // const resumeRemove = resumes.filter((res) => ({ res.id == id }))
      // setResumes(resumeRemove) // Atualiza a lista de currículos
    } catch (error) {
      console.error("Erro ao deletar currículo:", error)
      setError("Erro ao deletar currículo.")
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <ResumeContext.Provider value={{ resumes, loading, error, addResume, updateResume, deleteResume }}>
      {children}
    </ResumeContext.Provider>
  )
}

export const useResumeContext = (): ResumeContextData => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResumeContext deve ser usado dentro de um ResumeProvider.")
  }
  return context
}
