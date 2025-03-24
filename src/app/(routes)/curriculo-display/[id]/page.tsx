import ResumeForm from '@/app/components/display/resume-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { ResumeService } from '@/app/services/resumeService'
import { Resume } from '@/app/types/resume'

export default async function CurriculoDetailPage({
  params
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const resumeData: Resume = await ResumeService.getResumeById(Number(id))

  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      <ResumeForm resumeData={resumeData} />
    </div>
  )
}
