export interface Vacancy {
    id?: number
    quantity: number
    position: string
    description: string
    requirements: string
    benefits: string
    salary: number
}

// TODO: nunca usado
export interface VacancyResponse {
    id: number
    quantity: number
    position: string
    description: string
    requirements: string
    benefits: string
    salary: number
    created_at: string
    updated_at: string
}

// TODO: temos redundancia de 'VacancyContextProps' em vacancySchema
export interface VacancyContextProps {
    vacancies: Vacancy[]
    set_vacancies: React.Dispatch<React.SetStateAction<Vacancy[]>> // ✅ Add this line
    add_vacancy: (vacancy: Vacancy) => Promise<void>
    update_vacancy: (id: number, updates: Partial<Vacancy>) => Promise<void>
    remove_vacancy: (id: number) => Promise<void>
  }
