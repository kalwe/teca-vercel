'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmployeeHours() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [period, setPeriod] = useState('semana');
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  registerLocale('pt-BR', ptBR);

  const fetchEmployeeData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace this URL with your actual API endpoint
      const apiUrl = `https://api.example.com/employee-hours?start=${startDate?.toISOString()}&end=${endDate?.toISOString()}&period=${period}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: 'Horas Trabalhadas',
            data: data.workedHours,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
          },
          {
            label: 'Horas Extras',
            data: data.extraHours,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
          },
        ],
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchEmployeeData();
    }
  }, [startDate, endDate, period]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Resumo das Horas (${period.charAt(0).toUpperCase() + period.slice(1)})`,
      },
    },
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden"
    style={{
      background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))"
    }}
    >
      {/* Navigation Bar */}
      <nav className="bg-gray-800 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-white">COIF</h1>
          <div className="text-white">
            <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 transition">
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <h1 className="text-white text-3xl font-bold">Banco de Horas</h1>

          {/* Date and Period Selectors */}
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm mb-2">Data de Início</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                placeholderText="Selecione a data inicial"
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm mb-2">Data de Fim</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                placeholderText="Selecione a data final"
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm mb-2">Período</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              >
                <option value="dia">Dia</option>
                <option value="semana">Semana</option>
                <option value="mês">Mês</option>
                <option value="ano">Ano</option>
              </select>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 bg-gray-700 rounded-lg shadow-lg p-6">
            {loading ? (
              <p className="text-gray-300 text-center">Carregando dados...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : chartData ? (
              <Bar data={chartData} options={options} />
            ) : (
              <p className="text-gray-300 text-center">Selecione uma data para visualizar os dados.</p>
            )}
          </div>

          {/* Report Section */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-white text-lg font-bold mb-4">Relatório</h2>
            <p className="text-gray-300">
              Período:{' '}
              {startDate?.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }) || '-'}{' '}
              -{' '}
              {endDate?.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }) || '-'}
            </p>
            <p className="text-gray-300 mt-2">Horas trabalhadas: {chartData?.datasets[0]?.data.reduce((a: number, b: number) => a + b, 0) || '-'}</p>
            <p className="text-gray-300 mt-2">Horas extras: {chartData?.datasets[1]?.data.reduce((a: number, b: number) => a + b, 0) || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHours;
