import { useState } from 'react';

export function AddressGenerator({ cep }: { cep: string }) {
  const [endereco, setEndereco] = useState({
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  // Função para buscar o endereço na API ViaCEP
  const fetchEndereco = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setEndereco({
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        });
      } else {
        setEndereco({ rua: '', bairro: '', cidade: '', estado: '' });
      }
    } catch (error) {
      alert('Erro ao buscar o endereço.');
    }
  };

  // Verifica se o CEP é válido (8 dígitos) e busca o endereço
  if (cep.length === 9) {
    fetchEndereco(cep.replace('-', ''));
  }

  return (
    endereco.rua && (
      <div className="absolute bottom-[-100px] right-[-850px] w-[250px] flex flex-col space-y-4 bg-transparent">
        <div>
          <input
            type="text"
            placeholder="Rua"
            className="w-full bg-transparent border-none outline-none text-white placeholder-white"
            value={endereco.rua}
            readOnly
          />
          <div className="border-t border-white w-full mt-1"></div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Bairro"
            className="w-full bg-transparent border-none outline-none text-white placeholder-white"
            value={endereco.bairro}
            readOnly
          />
          <div className="border-t border-white w-full mt-1"></div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Cidade"
            className="w-full bg-transparent border-none outline-none text-white placeholder-white"
            value={endereco.cidade}
            readOnly
          />
          <div className="border-t border-white w-full mt-1"></div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Estado"
            className="w-full bg-transparent border-none outline-none text-white placeholder-white"
            value={endereco.estado}
            readOnly
          />
          <div className="border-t border-white w-full mt-1"></div>
        </div>
      </div>
    )
  );
}
