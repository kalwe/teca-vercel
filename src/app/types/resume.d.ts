export type ResumeType = {
  id: number
  fullName: string
  position: position
  positionId: number
  fileUrl: string
}


export type Resumes = ResumeType[]

export interface ResumeFormProps {
  mode: 'edit' | 'create'
  resumeData?: ResumeType
  onSave: (updatedData: ResumeType) => Promise<void>
  onCancel: () => void
  loading: boolean
}
