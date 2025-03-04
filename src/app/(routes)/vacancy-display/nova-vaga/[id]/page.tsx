'use client'

import VacancyForm from '@/app/components/display/vacancy-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { useParams, useRouter } from 'next/navigation'

export default function EditVacancyPage() {
  const router = useRouter()
  const params = useParams()

  const vacancyId = Number(params.id)

  if (isNaN(vacancyId)) {
    alert('ID inválido. Redirecionando...')
    router.replace('/vagas-display/')
    return
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <VacancyForm />
    </div>
  )
}
