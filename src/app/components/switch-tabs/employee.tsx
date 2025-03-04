'use client';

import { EmployeeService } from '@/app/services/employeeService'
import { EmployeeProps, EmployeeType } from '@/app/types/employee'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownCheckboxPosition from '../DropDown/dropdown-position'

export function Funcionario({
  data = {} as EmployeeType,
  onChange,
  isEditable,
  onNext,
  onPrev,
}: EmployeeProps) {

  const handleInputChange = (field: string, value: unknown) => {
    onChange({ ...data, [field]: value });
  };

  const handleSave = async () => {
    if (!data.registration || !data.contractDate) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const createdEmployee = await EmployeeService.createEmployee(data);
      console.log('Funcionário cadastrado com sucesso:', createdEmployee);
      onNext();
    } catch (error) {
      alert('Erro ao cadastrar funcionário.');
      console.error('Erro ao enviar para API:', error);

      if (error.response) {
        console.log('Resposta da API:', error.response.data);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-3 w-full">
      <h2 className="text-white text-xl font-bold">Funcionário</h2>

      {/* Campo de Matrícula */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Digite a matrícula</label>
        <input
          type="text"
          name="registration"
          value={data.registration || ''}
          onChange={(e) => handleInputChange('registration', e.target.value)}
          placeholder="Digite a matrícula"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Campo de Data de Admissão */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Admissão</label>
        <DatePicker
          selected={data.contractDate ? new Date(data.contractDate) : null}
          onChange={(date: Date | null) =>
            handleInputChange('contractDate', date?.toISOString())
          }
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Campo de Data de Remoção */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Data de Remoção</label>
        <DatePicker
          selected={data.removalDate ? new Date(data.removalDate) : null}
          onChange={(date: Date | null) =>
            handleInputChange('removalDate', date?.toISOString())
          }
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
          disabled={!isEditable}
        />
      </div>

      {/* Dropdown para Seleção de Cargo */}
      <div>
      <DropdownCheckboxPosition
  id={data.positionId ?? 1} // Passando apenas o ID corretamente
  onChange={(id) => handleInputChange('positionId', id)} // Garantindo que o primeiro parâmetro seja o ID
/>

      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Voltar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
