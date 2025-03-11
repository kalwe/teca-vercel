import ComebackButton from '@/app/components/button/comeback'
import VacancyList from '@/app/components/display/registered-vacancies'
import { Navigation } from '@/app/components/navigation/navigation'
import { VacancyService } from '@/app/services/vacancyService'

export default async function Page() {
  let vacancies = [];

  try {
    vacancies = await VacancyService.getAllVacancies();
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
  }

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
      }}
    >
      <Navigation />
      <VacancyList vacanciesData={vacancies || []} />
      <ComebackButton />
    </div>
  );
}
