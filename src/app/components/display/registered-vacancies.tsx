'use client'

import { VacancyService } from '@/app/services/vacancyService'
import { Vacancy } from '@/app/types/vacancyType'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VacancyList() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchVacancies = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await VacancyService.getAllVacancies()
      if (response) {
        setVacancies(response)
      } else {
        setError('Nenhuma vaga encontrada.')
      }
    } catch (err) {
      setError('Erro ao carregar vagas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVacancies()
  }, [])

  // Função para deletar uma vaga
  const handleDelete = async (vacancyId: number) => {
    if (!confirm('Tem certeza que deseja excluir esta vaga?')) return

    try {
      const success = await VacancyService.deleteVacancy(vacancyId)
      if (success) {
        setVacancies((prev) => prev.filter((v) => v.id !== vacancyId))
      } else {
        setError('Erro ao excluir vaga.')
      }
    } catch (err) {
      setError('Erro ao excluir vaga. Tente novamente.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 to-green-600">
      <div className="w-full max-w-5xl p-6 bg-gray-800 shadow-md rounded-lg border flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white">Vagas</h1>
          <button
            onClick={() => router.push('/vacancy-display/nova-vaga')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Adicionar Vaga
          </button>
        </div>

        {/* Lista de Vagas */}
        <div className="p-4 bg-gray-700 rounded-lg shadow-inner w-full">
          <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-2">
            <h1 className="text-gray-300 font-semibold w-2/5">Cargo</h1>
            <h1 className="text-gray-300 font-semibold w-1/5 text-center">Quantidade</h1>
            <h1 className="text-gray-300 font-semibold w-2/5 text-right">Ações</h1>
          </div>

          {loading && <p className="text-white text-center">Carregando vagas...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && vacancies.length === 0 && (
            <p className="text-gray-300 text-center">Nenhuma vaga cadastrada</p>
          )}

          {!loading && !error && vacancies.length > 0 && (
            <div className="overflow-y-auto rounded-lg" style={{ maxHeight: '300px' }}>
              {vacancies.map((vacancy) => (
                <div
                  key={vacancy.id}
                  className="flex justify-between items-center p-2 bg-gray-800 rounded-md mb-2 hover:bg-gray-700"
                >
                  {/* Cargo */}
                  <span className="text-gray-300 font-medium w-2/5">
                    {vacancy.position?.name || 'Sem posição'}
                  </span>

                  {/* Quantidade */}
                  <span className="text-gray-300 font-medium w-1/5 text-center">
                    {vacancy.quantity}
                  </span>

                  {/* Ações */}
                  <div className="flex justify-end w-2/5 gap-2">
                    <button
                      onClick={() => router.push(`/vacancy-display/nova-vaga/${vacancy.id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(Number(vacancy?.id))}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
