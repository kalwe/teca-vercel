export type ClothingType = {
    shirt_size: string;
    pants_size: string;
    shoe_size: string;
}

export type ClothingProps = {
    data: Clothing
    onChange: (updatedData: ClothingProps["data"]) => void;
    mode: "add" | "edit" | "view" | "create";
    employeeId?: any;
  }
