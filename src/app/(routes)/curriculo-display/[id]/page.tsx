import ResumeForm from '@/app/components/display/resume-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { Resume } from '@/app/schemas/cvSchema'
import { ResumeService } from '@/app/services/resumeService'

export default async function CurriculoDetailPage({
  params
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const resumeData: Resume = await ResumeService.getResumeById(id)

  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      <ResumeForm resumeData={resumeData} />
    </div>
  )
}
