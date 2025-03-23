import { PositionService } from '@/app/services/positionService'
import DropdownCheckboxPosition from './dropdown-position'

export default async function ServerDropdown({
  id,
  onChange
}: {
  id: number | null
  onChange: (id: number, name: string) => void
}) {
  const positionsFetched = await PositionService.getAllPositions()

  return (
    <DropdownCheckboxPosition
      id={id}
      onChange={onChange}
      positionsData={positionsFetched}
    />
  )
}
