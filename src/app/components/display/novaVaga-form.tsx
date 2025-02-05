'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DropdownCheckbox from '@/app/components/DropDown/dropdown-cargo';
import { QuantityMask } from '@/app/components/masks/quantity';
import MoneyInput from '@/app/components/masks/salary';
import { useVagasContext } from '@/app/context/VagasContext';
import { VacancyService } from '@/app/services/vacancyService';
import { Vacancy } from '@/app/types/vacancyType';
import { vacancySchema, sanitizeVacancy } from '@/app/schemas/vacancySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


function NovaVaga() {
  const { vacancies, update_vacancy, add_vacancy } = useVagasContext();
  const searchParams = useSearchParams();
  const index = searchParams.get('index');
  const isEditMode = index !== null;
  const router = useRouter();
  const { watch } = useForm();



  /**
   * React Hook Form setup with Zod schema validation.
   */
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
    reset,
  } = useForm<Vacancy & { salary_display: string }>({
    resolver: zodResolver(vacancySchema)
  });


  /**
   * Populate form if in edit mode.
   */
  useEffect(() => {
    if (isEditMode) {
      const vacancy = vacancies[Number(index)];
      if (vacancy) {
        reset({
          position: vacancy.position,
          quantity: vacancy.quantity,
          description: vacancy.description,
          requirements: vacancy.requirements,
          benefits: vacancy.benefits,
          salary: vacancy.salary,
        });
      }
    }
  }, [index, isEditMode, vacancies, reset]);

  /**
   * Handles form submission.
   */
  const onSubmit = async (data: Vacancy) => {
    try {
      const validatedVacancy = sanitizeVacancy(data);

      if (isEditMode) {
        await update_vacancy(Number(index), validatedVacancy);
        alert('Vaga atualizada com sucesso.');
      } else {
        await add_vacancy(validatedVacancy);
        alert('Nova vaga adicionada com sucesso.');
      }
      reset();
      router.push('/vagas-display/');
    } catch (error) {
      console.error('Erro ao criar vaga', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen"
      style={{ background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))" }}>
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">
          {isEditMode ? 'Editar Vaga' : 'Nova Vaga'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cargo Dropdown */}
            <div>
              <DropdownCheckbox
                value=""
                onChange={(value) => setValue("position", value)}
                options={['Cargo1', 'Cargo2', 'Cargo3', 'Cargo4']}
                disabled={isEditMode}
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
            </div>

            {/* Quantity Mask */}
            <div>
            <QuantityMask
  value={Number(watch('quantity')) || 1} // Converte para número e garante um valor válido
  onChange={(newQuantity: number) => setValue('quantity', newQuantity, { shouldValidate: true })} // Atualiza corretamente o `react-hook-form`
  min={1} // Define o mínimo permitido
  max={100} // Defina um valor máximo adequado
/>


              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Descrição</label>
            <textarea {...register('description')} className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500" placeholder="Digite a descrição" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Requirements Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Requisitos</label>
            <textarea {...register('requirements')} className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500" placeholder="Digite os requisitos" />
            {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}
          </div>

          {/* Benefits Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Benefícios</label>
            <textarea {...register('benefits')} className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500" placeholder="Digite os benefícios" />
            {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits.message}</p>}
          </div>

          {/* Salary Input */}
          <div>
          <MoneyInput
  value={watch("salary_display") || "R$ 0,00"} // Mantém exibição formatada
  onChange={(newValue) => {
    // Remove caracteres não numéricos e converte para número
    const numericValue = Number(newValue.replace(/[^\d,]/g, "").replace(",", "."));

    // Atualiza a string formatada para exibição
    setValue("salary_display", new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue));

    // Atualiza o valor real como número puro
    setValue("salary", numericValue, { shouldValidate: true });
  }}
/>




  {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/vagas-display/')}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
              {isEditMode ? 'Atualizar Vaga' : 'Salvar Nova Vaga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaVaga;
