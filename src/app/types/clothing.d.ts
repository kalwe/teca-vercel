type ClothingT = {
  shirt?: any | null
  pants?: any | null
  shoe?: any | null
  employeeId: number | null
}

export type Clothing = ClothingT | Partial<ClothingT>
export type Clothings = ClothingT[] | Partial<ClothingT>[]

export type ClothingProps = {
  data: Clothing | null
  onChange: (updatedData: Clothing) => void
  onNext: () => void
  onPrev: () => void
  employeeId: number | null
}
