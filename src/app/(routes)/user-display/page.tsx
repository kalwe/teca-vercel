'use client'


import UserForm from "@/app/components/display/user-form"

import './style.css'

export const dynamic = 'force-dynamic'

export default function Contract() {


  return (
    <div style={{ background: 'linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))' }}>
      {/* seu conteúdo */}

      <UserForm userData={{}} />


    </div>
  )
}
