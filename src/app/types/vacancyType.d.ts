import { Position } from './position'

export type VacancyT = {
  id?: number | null
  quantity?: number | null
  description?: string | null
  requirements?: string | null
  benefits?: string | null
  salary?: number | null
  active?: boolean
  positionId: number
  position?: Position | null
}

export type Vacancy = VacancyT | Partial<VacancyT>
export type Vacancies = Vacancy[] | Partial<Vacancy>[]
