
import VacancyForm from '@/app/components/display/vacancy-form'
import { Navigation } from '@/app/components/navigation/navigation'


export default function Page() {

  return (
    <div className="mx-auto mt-10">
      <Navigation />
      <VacancyForm />
    </div>
  )
}
