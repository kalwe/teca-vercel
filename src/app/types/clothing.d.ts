export type ClothingT = {
  shirt_size: string;
  pants_size: string;
  shoe_size: string;
  employeeId?: number;
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
