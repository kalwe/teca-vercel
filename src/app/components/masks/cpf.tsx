interface CpfMaskProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean; // Adiciona a propriedade opcional `disabled`
}

export function CpfMask({ value = "", onChange, disabled }: CpfMaskProps) {
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cpfValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Apply CPF mask
    if (cpfValue.length > 3 && cpfValue.length <= 6) {
      cpfValue = cpfValue.slice(0, 3) + "." + cpfValue.slice(3);
    } else if (cpfValue.length > 6 && cpfValue.length <= 9) {
      cpfValue =
        cpfValue.slice(0, 3) +
        "." +
        cpfValue.slice(3, 6) +
        "." +
        cpfValue.slice(6);
    } else if (cpfValue.length > 9) {
      cpfValue =
        cpfValue.slice(0, 3) +
        "." +
        cpfValue.slice(3, 6) +
        "." +
        cpfValue.slice(6, 9) +
        "-" +
        cpfValue.slice(9, 11);
    }

    // Pass the masked CPF value to the parent
    onChange({ ...e, target: { ...e.target, value: cpfValue } });
  };

  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="CPF"
        className="w-full bg-transparent border-none outline-none text-white placeholder-white"
        value={value} // Controlled input
        onChange={handleCpfChange}
        maxLength={14} // CPF format limit
        disabled={disabled} // Adiciona suporte ao `disabled`
      />
      <div className="border-t border-white w-full mt-1"></div>
    </div>
  );
}
