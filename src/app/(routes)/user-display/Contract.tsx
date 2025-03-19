'use client'

import { Suspense } from 'react'
import Contract from "./page"
export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando página...</p>}>
      <Contract />
    </Suspense>
  )
}
