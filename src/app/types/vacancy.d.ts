import { Position } from './position'

type VacancyT = {
  id?: any | null
  quantity?: any | null
  description?: any | null
  requirements?: any | null
  benefits?: any | null
  salary?: any | null
  active?: any | null
  positionId?: any | null
  position?: Position | null
}

export type Vacancy = VacancyT | Partial<VacancyT>
export type Vacancies = VacancyT[] | Partial<VacancyT>[]
