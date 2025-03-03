import { Position } from './position'

export interface Vacancy {
  id?: number
  quantity: number
  positionId: number
  position: Position
  description: string
  requirements: string
  benefits: string
  salary: number
  active: boolean
}

export type Vacancies = Vacancy[]
