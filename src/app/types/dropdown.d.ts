export interface DropDownBurgerProps {
    isOpen: boolean;
  }

  export interface DropdownCheckboxProps {
    value?: string;
    onChange: (value: string) => void; // Certifique-se de que recebe um string
    disabled?: boolean;
    options: string[];
  }


  export interface DropdownCheckboxEstadoCivilProps {
    value: string;
    onChange: (value: string) => void; // Callback to update value in parent
    disabled?: boolean; // Optional disabled property
  }

  export interface DropdownCheckboxFuncaoProps {
    value: string; // Valor controlado
    onChange: (value: string) => void; // Callback para atualizar o estado no componente pai
    disabled?: boolean;
}

  export interface DropdownCheckboxGenderProps {
    value: string; // Controlled value
    onChange: (value: string) => void; // Callback to update the parent state
    disabled?: boolean; // Add optional `disabled` prop
  }

  export interface DropdownCheckboxRegionalProps {
    value: string; // Valor selecionado vindo do componente pai
    onChange: (value: string) => void; // Função de callback para atualizar o valor no componente pai
    disabled?: boolean;
}

  export interface DropdownCheckboxSchoolProps {
    value: string; // Valor selecionado vindo do componente pai
    onChange: (value: string) => void; // Callback para alterar o valor no componente pai
    disabled?: boolean;
  }
