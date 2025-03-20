import { PositionService } from '@/app/services/positionService'
import { Positions } from '@/app/types/position'
import DropdownCheckboxPosition from './dropdown-position'

export default async function DropdownPosition({
  id,
  onChange
}: {
  id: number | null
  onChange: (id: number, name: string) => void
}) {
  const positionsData: Positions = await PositionService.getAllPositions()

  return (
    <DropdownCheckboxPosition id={id} onChange={onChange} positionsData={positionsData} />
  )
}
