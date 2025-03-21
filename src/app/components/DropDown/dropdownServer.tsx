import { PositionService } from '@/app/services/dropdownService'
import DropdownCheckboxPosition from './dropdown-position'

export default async function ServerDropdown({
  id,
  onChange
}: {
  id: number | null
  onChange: (id: number, name: string) => void
}) {
  const dropdownPositionData = await PositionService.getAllPositions()

  console.log('Cargos do ServerDropdown:', dropdownPositionData) // TESTE AQUI

  return (
    <DropdownCheckboxPosition
      id={id}
      onChange={onChange}
      dropdownPositionData={dropdownPositionData}
    />
  )
}
