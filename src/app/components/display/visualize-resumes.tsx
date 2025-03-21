'use client'

import { Resumes } from '@/app/types/resume'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import resumeImage from '../assets/cvImage.png'

export default function VisualizeCV({ resumesData }: { resumesData: Resumes }) {
  const router = useRouter()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastResumeRef = useRef<HTMLDivElement | null>(null)

  const [resumes, setResumes] = useState<Resumes>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [, setLoading] = useState<boolean>(true)
  const [errorMessage] = useState<string | null>(null)
  const [, setPage] = useState(1)

  useEffect(() => {
    const fetchResumes = () => {
      setLoading(true)
      setResumes(resumesData)
    }
    if (resumes) {
      setLoading(false)
      fetchResumes()
    }
  }, [resumes, resumesData])

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { rootMargin: '100px' }
    )

    if (lastResumeRef.current) observerRef.current.observe(lastResumeRef.current)
  }, [resumes])

  const filteredResumes = useMemo(() => {
    if (!searchTerm) return resumes
    return resumes.filter((resume) =>
      resume.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, resumes])

  return (
    <div
      className='flex justify-center items-center min-h-screen p-4'
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))'
      }}
    >
      <div className='w-full max-w-4xl bg-gray-800 shadow-md rounded-lg border p-6'>
        <div className='flex px-4 py-3 mb-6 rounded-md border border-blue-500 bg-gray-700'>
          <input
            type='text'
            placeholder='Buscar currículo...'
            className='w-full bg-transparent text-gray-300 outline-none text-sm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}

        <div className='flex items-center justify-center mb-6'>
          <button
            onClick={() => router.push('/curriculo-display/')}
            className='px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105'
          >
            Adicionar Currículo
          </button>
        </div>

        <div className='overflow-y-auto border-t border-gray-600 max-h-96'>
          {filteredResumes.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-4'>
              {filteredResumes.map((resume, index) => (
                <div
                  key={`resume-${resume.id}-${index}`}
                  className='flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
                  onClick={() => router.push(`/curriculo-display/${resume.id}`)}
                  ref={index === filteredResumes.length - 1 ? lastResumeRef : null}
                >
                  <h1 className='text-gray-300 font-semibold'>{resume.fullName}</h1>
                  <a href={resume.fileUrl} download>
                    <Image
                      alt='Currículo'
                      src={resumeImage}
                      width={20}
                      height={20}
                      className='cursor-pointer'
                    />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-300 text-center py-4'>Nenhum currículo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  )
}
