'use client'

import { ResumeService } from '@/app/services/resumeService'
import type { Resume } from '@/app/types/resume'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export default function ResumeForm() {
  const router = useRouter()
  const { id } = useParams()
  const isEditMode = !!id
  const resumeId = isEditMode ? Number(id) : null
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [resume, setResume] = useState<Partial<Resume>>({})

  const handleChange = <K extends keyof Resume>(field: K, value: Resume[K]) => {
    setResume((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const handleSaveAll = async () => {
    try {
      setLoading(true)

      const resumeIdSaved = await handleSave()

      // if (resumeIdSaved && file) {
      //   await ResumeService.uploadResumeFile(resumeIdSaved, file)
      // }

      alert(`Currículo salvo com sucesso! ${resumeIdSaved}`)
      router.push('/curriculo-display/visualize-cv')
    } catch (error) {
      console.error('Erro ao salvar currículo:', error)
      alert('Erro ao salvar currículo. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      let savedResume
      if (isEditMode && resumeId) {
        console.log('RESUME-ID', resumeId)
        await ResumeService.updateResume(resumeId, resume)
        savedResume = { id: resumeId }
      } else {
        savedResume = await ResumeService.createResume(resume)
      }
      return savedResume.id
    } catch (error) {
      console.error('Erro ao salvar currículo:', error)
      alert('Erro ao salvar currículo. Tente novamente.')
      return null
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700'>
      <div className='w-full max-w-4xl p-6 bg-gray-800 shadow-md rounded-lg border border-gray-700'>
        <h1 className='text-2xl font-bold text-white mb-6 text-center'>
          {isEditMode ? 'Editar Currículo' : 'Novo Currículo'}
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
          {/* Upload do Arquivo */}
          <div>
            <label
              htmlFor='file-upload'
              className='flex items-center gap-4 px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white cursor-pointer hover:bg-gray-600'
            >
              <div className='w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'>
                📎
              </div>
              <span>{file ? file.name : 'Anexar Arquivo'}</span>
              <input
                id='file-upload'
                type='file'
                onChange={handleFileUpload}
                className='hidden'
              />
            </label>
          </div>

          {/* Campos de entrada */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <input
                type='text'
                value={resume.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder='Nome Completo'
                className='w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white placeholder-gray-400'
              />
            </div>
            <div>
              <DropdownCheckboxPosition
                id={resume.positionId ?? null}
                onChange={(value) => handleChange('positionId', value)}
              />
            </div>
          </div>

          {/* Botões de ação */}
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={() => router.push('/curriculo-display/visualize-cv')}
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500'
            >
              Cancelar
            </button>
            <button
              type='submit'
              onClick={handleSaveAll}
              className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50'
              disabled={loading}
            >
              {loading
                ? 'Salvando...'
                : isEditMode
                  ? 'Atualizar Currículo'
                  : 'Salvar Currículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
