import VacancyForm from '@/app/components/display/vacancy-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { VacancyService } from '@/app/services/vacancyService'
import { Vacancy } from '@/app/types/vacancy'
import { useParams, useRouter } from 'next/navigation'

export default async function EditVacancyPage() {
  const router = useRouter()
  const params = useParams()

  const vacancyId = Number(params.id)
  const vacancy: Vacancy = await VacancyService.getVacancyById(vacancyId)

  if (isNaN(vacancyId)) {
    alert('ID inválido. Redirecionando...')
    router.replace('/vagas-display/')
    return
  }

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <VacancyForm vacancyData={vacancy} />
    </div>
  )
}
