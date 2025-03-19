import VacancyForm from '@/app/components/display/vacancy-form'
import { Navigation } from '@/app/components/navigation/navigation'

export default async function Page() {
  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      <VacancyForm vacancyData={{}} />
    </div>
  )
}
