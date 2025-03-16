import VacancyForm from '@/app/components/display/vacancy-form'
import { VacancyService } from '@/app/services/vacancyService'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params

  const vacancy = await VacancyService.getVacancyById(id)

  return vacancy ? <VacancyForm vacancyData={vacancy} /> : <p>Vaga não encontrada.</p>
}
