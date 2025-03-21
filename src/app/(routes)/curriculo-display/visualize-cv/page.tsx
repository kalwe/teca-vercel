import ComebackButton from '@/app/components/button/comeback'
import VisualizeCV from '@/app/components/display/visualize-resumes'
import { Navigation } from '@/app/components/navigation/navigation'
import { ResumeService } from '@/app/services/resumeService'
import { Resumes } from '@/app/types/resume'
import '../style.css'

export default async function Page() {
  const fetchedResumes: Resumes = await ResumeService.getAllResumes()
  console.log(fetchedResumes)

  return (
    <div>
      <Navigation />
      <VisualizeCV resumesData={fetchedResumes} />
      <ComebackButton />
    </div>
  )
}
