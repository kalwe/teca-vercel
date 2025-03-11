import VacancyForm from "@/app/components/display/vacancy-form"
import { Navigation } from "@/app/components/navigation/navigation"

export default async function Page() {


  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <VacancyForm vacancyData={{
        positionId: undefined,
        quantity: undefined,
        description: undefined,
        benefits: undefined,
        requirements: undefined,
        salary: undefined
      }}  />
    </div>
  );
}
