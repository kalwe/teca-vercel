export type ClothingType = {
    shirt_size: string
    pants_size: string
    shoe_size: string
    employee?: number
}

export type ClothingProps = {
    data: ClothingType
    onChange: (updatedData: ClothingProps["data"]) => void
    mode: "add" | "edit" | "view" | "create"
    employee?: number
  }
