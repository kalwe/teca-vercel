type ResumeT = {
  id: number
  fullName: string
  position: Position
  positionId: number
  fileUrl: string
}


export type Resume = ResumeT | Partial<ResumeT>
export type Resumes = ResumeT[] | Partial<ResumeT>[]

export interface ResumeFormProps {
  mode: 'edit' | 'create'
  resumeData?: ResumeT
  onSave: (updatedData: ResumeT) => Promise<void>
  onCancel: () => void
  loading: boolean
}
