import { useState } from 'react';

export default function BirthDayMask() {
  const [dataNascimento, setDataNascimento] = useState('');

  // Função para aplicar máscara de data
  const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    } else if (value.length > 4) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
    }

    setDataNascimento(value);
  };

  return (
    <div>
     <div className="w-full">
                <input
                  type="text"
                  placeholder="Data de Nascimento"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                  value={dataNascimento}
                  onChange={handleDataNascimentoChange}
                  maxLength={10}
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
    </div>
  );
}
