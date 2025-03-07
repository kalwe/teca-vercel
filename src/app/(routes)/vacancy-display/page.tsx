

import ComebackButton from '@/app/components/button/comeback'
import VacancyList from '@/app/components/display/registered-vacancies'
import { Navigation } from '@/app/components/navigation/navigation'
import { VacancyService } from "@/app/services/vacancyService"
import { Vacancies } from "@/app/types/vacancyType"


export default async function Page() {
  const vacancies: Vacancies = await VacancyService.getAllVacancies()

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))',
      }}
    >
      <Navigation />
      <VacancyList
      vacanciesData={vacancies}
      />
      <ComebackButton />
    </div>
  )
}
