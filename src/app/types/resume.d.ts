import { Position } from './position'

type ResumeT = {
  id: any | null
  fullName?: any | null
  position?: Position | null
  positionId?: any | null
  fileUrl?: any | null
}

export type Resume = ResumeT | Partial<ResumeT>
export type Resumes = ResumeT[] | Partial<ResumeT>[]

export interface ResumeFormProps {
  data: Resume | null
  onSave: (updatedData: Resume) => void
  onCancel: () => void
  loading: boolean
}
