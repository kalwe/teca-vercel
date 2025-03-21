import ComebackButton from '@/app/components/button/comeback'
import ContractForm from '@/app/components/display/contract-form'
import { Navigation } from '@/app/components/navigation/navigation'

export default function Page() {
  return (
    <div className='bg-gradient-to-br from-[#0B140B] to-[#4F7452] min-h-screen relative'>
      <Navigation />
      <ContractForm data={{}} isEditable={false} />
      <ComebackButton />
    </div>
  )
}
