import { useState } from 'react';
import { AddressGenerator } from '../forms/address';

interface CepMaskProps {
  value: string; // Valor controlado do CEP
  onChange: (value: string) => void; // Callback para atualizar o estado no componente pai
}

export default function CepMask({ value, onChange }: CepMaskProps) {
  const [cep, setCep] = useState('');

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cepValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cepValue.length > 5) {
      cepValue = cepValue.slice(0, 5) + '-' + cepValue.slice(5, 8); // Aplica a máscara
    }
    onChange(cepValue); // Notifica o componente pai da alteração no CEP
  };

  return (
    <div className="relative flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="CEP"
            className="w-full bg-transparent border-none outline-none text-white placeholder-white"
            value={value}
            onChange={handleCepChange}
            maxLength={9} // Limita o número máximo de caracteres para o formato do CEP
          />
          <div className="border-t border-white w-full mt-1"></div>
        </div>
      </div>
<AddressGenerator cep={cep} />
    </div>
  );
}
