import VacancyForm from "@/app/components/display/vacancy-form"
import { VacancyService } from "@/app/services/vacancyService"
import { Vacancies } from "@/app/types/vacancyType"
import { Navigation } from "lucide-react"

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) {
    return <p>Error: ID not provided</p>;
  }

  const vacancies: Vacancies = await VacancyService.getVacancyById(Number(params.id));

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <VacancyForm vacanciesData={vacancies} />
    </div>
  )
}
