export type ClothingT = {
  shirt_size?: any | null
  pants_size?: any | null
  shoe_size?: any | null
  employeeId?: any | null
};

export type Clothing = ClothingT | Partial<ClothingT>
export type Clothings = ClothingT[] | Partial<ClothingT>[]


export type ClothingProps = {
  data: Clothing;
  onChange: (updatedData: Clothing) => void;
  mode: 'add' | 'edit' | 'view' | 'create';
  onPrev: () => void;
  employeeId: number;
};
