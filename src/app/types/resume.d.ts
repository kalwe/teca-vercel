export type ResumeType = {
  id: number
  fullName: string
  email: string
  taxId: string
  phone: string
  zip_code: string
  position: string
  region: string
  scholarity: string
  dateOfBirth: string
  pdf_url: string
}


export type Resumes = ResumeType[]

export interface ResumeFormProps {
  mode: 'edit' | 'create'
  resumeData?: ResumeType
  onSave: (updatedData: ResumeType) => Promise<void>
  onCancel: () => void
  loading: boolean
}
