import '../style.css'

import ComebackButton from '@/app/components/button/comeback'
import EmployeesDisplay from '@/app/components/display/registered-employees'
import { Navigation } from '@/app/components/navigation/navigation'

export default function Page() {
  return (
    <div>
      <Navigation />
      <EmployeesDisplay />
      <ComebackButton />
    </div>
  )
}
