type ResumeT = {
  id: any | null
  fullName: any | null
  position: any | null
  positionId: any | null
  fileUrl: any | null
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
