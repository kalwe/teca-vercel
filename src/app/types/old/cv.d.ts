
export type Resume = {
    id: number; // Unique identifier for the CV
    fullName: string; // Candidate's full name
    email: string; // Candidate's email
    taxId: string; // Candidate's CPF (Brazilian ID)
    phone: string; // Contact phone number
    zip_code: string; // Candidate's ZIP code
    position: string; // Desired job position
    region: string; // Candidate's region
    scholarity: string; // Candidate's education level
    dateOfBirth: string; // Date of birth (Format: dd-mm-yyyy)
    fileUrl: string; // URL of the CV PDF file
  };
