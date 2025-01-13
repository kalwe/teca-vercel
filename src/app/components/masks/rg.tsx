interface RgMaskProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean; // Propriedade opcional para desativar o campo
  }

  export function RgMask({ value = "", onChange, disabled = false }: RgMaskProps) {
    const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

      if (inputValue.length > 2 && inputValue.length <= 5) {
        inputValue = inputValue.slice(0, 2) + "." + inputValue.slice(2);
      } else if (inputValue.length > 5 && inputValue.length <= 8) {
        inputValue =
          inputValue.slice(0, 2) +
          "." +
          inputValue.slice(2, 5) +
          "." +
          inputValue.slice(5);
      } else if (inputValue.length > 8) {
        inputValue =
          inputValue.slice(0, 2) +
          "." +
          inputValue.slice(2, 5) +
          "." +
          inputValue.slice(5, 8) +
          "-" +
          inputValue.slice(8, 9);
      }

      // Chama o onChange com o valor formatado
      onChange({ ...e, target: { ...e.target, value: inputValue } });
    };

    return (
      <div className="flex-1">
        <input
          type="text"
          placeholder="RG"
          className={`w-full bg-transparent border-none outline-none text-white placeholder-white ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          value={value}
          onChange={handleRgChange}
          maxLength={12} // Máximo de 12 caracteres (xx.xxx.xxx-x)
          disabled={disabled} // Desativa o campo quando `disabled` é verdadeiro
        />
        <div className="border-t border-white w-full mt-1"></div>
      </div>
    );
  }
