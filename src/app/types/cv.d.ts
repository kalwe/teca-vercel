export type CvType = {
    id: number; // Unique identifier for the CV
    full_name: string; // Candidate's full name
    email: string; // Candidate's email
    tax_id: string; // Candidate's CPF (Brazilian ID)
    phone: string; // Contact phone number
    zip_code: string; // Candidate's ZIP code
    position: string; // Desired job position
    region: string; // Candidate's region
    scholarity: string; // Candidate's education level
    date_of_birth: string; // Date of birth (Format: YYYY-MM-DD)
    pdf_url: string; // URL of the CV PDF file
  };



  export interface CvFormProps {
    mode: "edit" | "create";
    curriculoData?: CvType;
    onSave: (updatedData: CvType) => Promise<void>; // Callback para salvar
    onCancel: () => void; // Callback para cancelar
    loading: boolean; // Indica estado de carregamento
  }
