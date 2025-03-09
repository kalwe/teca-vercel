import { Position } from './position'

type VacancyT = {
  id?: number
  quantity?: number
  description?: string
  requirements?: string
  benefits?: string
  salary?: number
  active?: boolean
  positionId: number
  position?: Position
}

export type Vacancy = VacancyT | Partial<VacancyT>
export type Vacancies = VacancyT[] | Partial<VacancyT>[]
