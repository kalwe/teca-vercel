"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import NovaVagaForm from '@/app/components/display/novaVaga-form';
import { Navigation } from '@/app/components/navigation/navigation';
import { vacancySchema, VacancyContextProps } from '@/app/schemas/vacancySchema'; // Assumindo que você tenha um schema para nova vaga

function NovaVaga() {
  const [errors, setErrors] = useState<Record<string, string>>({}); // Armazenar os erros de validação
  const [loading, setLoading] = useState(false); // Controlar o estado de carregamento

  // Função para lidar com o envio do formulário
  const handleSave = async (formData: any) => {
    setLoading(true);
    try {
      // Validar os dados usando Zod
      vacancySchema.parse(formData); // Isso irá lançar um erro se os dados forem inválidos

      // Se os dados forem válidos, enviar para a API (substitua pela lógica de envio)
      // await NovaVagaService.createNovaVaga(formData);

      alert('Vaga criada com sucesso!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Se houver erro de validação Zod, capturamos e exibimos
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message; // Adiciona o erro à lista de erros
        });
        setErrors(validationErrors); // Exibe os erros
      } else {
        // Caso o erro não seja de validação (ex: erro de rede)
        console.error('Erro ao salvar a vaga:', error);
        alert('Erro ao salvar a vaga. Tente novamente.');
      }
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div>
      <Navigation />
      <NovaVagaForm onSave={handleSave} errors={errors} loading={loading} />
    </div>
  );
}

export default NovaVaga;
