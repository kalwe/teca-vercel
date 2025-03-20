'use client'

import '../style.css'

import ComebackButton from '@/app/components/button/comeback'
import VisualizeCV from '@/app/components/display/visualize-resumes'
import { Navigation } from '@/app/components/navigation/navigation'

export default function Contract() {
  // const router = useRouter()

  // const handleClick = () => {
  //   router.push('/dashboard-display/')
  // }

  return (
    <div>
      <Navigation />
      <VisualizeCV />
      <ComebackButton />
    </div>
  )
}
