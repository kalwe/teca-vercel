import VacancyForm from '@/app/components/display/vacancy-form'
import { VacancyService } from '@/app/services/vacancyService'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params

  const vacancyData = await VacancyService.getVacancyById(Number(id))

  return vacancyData ? (
    <VacancyForm vacancyData={vacancyData} />
  ) : (
    <p>Vaga não encontrada.</p>
  )
}
