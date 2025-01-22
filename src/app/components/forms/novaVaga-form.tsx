'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DropdownCheckbox from '@/app/components/DropDown/dropdown-cargo';
import { QuantityMask } from '@/app/components/masks/quantity';
import MoneyInput from '@/app/components/masks/salary';
import { useVagasContext } from '@/app/context/VagasContext';

function NovaVaga() {
  const [cargo, setCargo] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [beneficios, setBeneficios] = useState('');
  const [salario, setSalario] = useState('');
  const searchParams = useSearchParams();
  const { vagas, updateVaga, addVaga } = useVagasContext();
  const index = searchParams.get('index');
  const isEditMode = index !== null;
  const router = useRouter();

  useEffect(() => {
    if (isEditMode) {
      const vaga = vagas[Number(index)];
      if (vaga) {
        setCargo(vaga.cargo);
        setQuantidade(vaga.quantidade);
        setDescricao(vaga.descricao);
        setRequisitos(vaga.requisitos);
        setBeneficios(vaga.beneficios);
        setSalario(vaga.salario);
      }
    }
  }, [index, isEditMode, vagas]);

  const handleSave = () => {
    if (!cargo || quantidade <= 0) {
      alert('Por favor, preencha o cargo e a quantidade.');
      return;
    }

    const newOrUpdatedVaga = {
      vaga: cargo,
      quantidade,
      cargo,
      descricao,
      requisitos,
      beneficios,
      salario,
    };

    if (isEditMode) {
      updateVaga(Number(index), newOrUpdatedVaga);
      alert('Vaga atualizada com sucesso.');
    } else {
      const exists = vagas.some((vaga) => vaga.cargo === cargo);
      if (exists) {
        alert(`O cargo "${cargo}" já existe. Por favor, escolha outro.`);
        return;
      }

      addVaga(newOrUpdatedVaga);
      alert('Nova vaga adicionada com sucesso.');
    }
    router.push('/vagas-display/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen "
    style={{
      background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))"
    }}
    >
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">
          {isEditMode ? 'Editar Vaga' : 'Nova Vaga'}
        </h1>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>

              <DropdownCheckbox
                value={cargo}
                onChange={setCargo}
                options={['Cargo1', 'Cargo2', 'Cargo3', 'Cargo4']}
                disabled={isEditMode}
              />
            </div>
            <div>

              <QuantityMask
                value={quantidade}
                onChange={(newQuantity: number) => setQuantidade(newQuantity)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Descrição
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500"
              placeholder="Digite a descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Requisitos
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500"
              placeholder="Digite os requisitos"
              value={requisitos}
              onChange={(e) => setRequisitos(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Benefícios
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500"
              placeholder="Digite os benefícios"
              value={beneficios}
              onChange={(e) => setBeneficios(e.target.value)}
            />
          </div>
          <div>

            <MoneyInput
              value={salario}
              onChange={(newValue) => setSalario(newValue)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/vagas-display/')}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
            >
              {isEditMode ? 'Atualizar Vaga' : 'Salvar Nova Vaga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaVaga;
