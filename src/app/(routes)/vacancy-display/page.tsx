'use client'

import ComebackButton from '@/app/components/button/comeback'
import VacancyList from '@/app/components/display/registered-vacancies'
import { Navigation } from '@/app/components/navigation/navigation'

function Contract() {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))',
      }}
    >
      <Navigation />

      <VacancyList />
      <ComebackButton />
    </div>
  )
}

export default Contract
