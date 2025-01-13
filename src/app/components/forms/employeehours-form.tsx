'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";

import { ptBR } from "date-fns/locale";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmployeeHours() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
  const [period, setPeriod] = useState("semana"); // Define o período selecionado (dia, semana, mês, ano)

  registerLocale("pt-BR", ptBR);


  // Dados dinâmicos para o gráfico
  const getDataByPeriod = () => {
    switch (period) {
      case "dia":
        return {
          labels: ["01/01", "02/01", "03/01", "04/01", "05/01", "06/01", "07/01"],
          datasets: [
            {
              label: "Horas Trabalhadas",
              data: [8, 7, 9, 6, 8, 7, 8],
              backgroundColor: "rgba(75, 192, 192, 0.8)",
            },
            {
              label: "Horas Extras",
              data: [1, 0, 2, 0, 1, 1, 1],
              backgroundColor: "rgba(255, 99, 132, 0.8)",
            },
          ],
        };
      case "semana":
        return {
          labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
          datasets: [
            {
              label: "Horas Trabalhadas",
              data: [40, 35, 50, 45],
              backgroundColor: "rgba(75, 192, 192, 0.8)",
            },
            {
              label: "Horas Extras",
              data: [8, 10, 5, 12],
              backgroundColor: "rgba(255, 99, 132, 0.8)",
            },
          ],
        };
      case "mês":
        return {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
          datasets: [
            {
              label: "Horas Trabalhadas",
              data: [160, 150, 180, 170],
              backgroundColor: "rgba(75, 192, 192, 0.8)",
            },
            {
              label: "Horas Extras",
              data: [20, 15, 25, 30],
              backgroundColor: "rgba(255, 99, 132, 0.8)",
            },
          ],
        };
      case "ano":
        return {
          labels: ["2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "Horas Trabalhadas",
              data: [1920, 1850, 2000, 1950],
              backgroundColor: "rgba(75, 192, 192, 0.8)",
            },
            {
              label: "Horas Extras",
              data: [200, 180, 220, 250],
              backgroundColor: "rgba(255, 99, 132, 0.8)",
            },
          ],
        };
      default:
        return { labels: [], datasets: [] };
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Resumo das Horas (${period.charAt(0).toUpperCase() + period.slice(1)})`,
      },
    },
  };

  return (
    <div className="h-screen w-screen bg-gray-900 flex items-center justify-center overflow-y-auto">
      {/* Contêiner Principal */}
      <div className="w-[85%] h-[90%] bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
        <h1 className="text-white text-3xl font-bold mb-6">Banco de Horas</h1>

        {/* Período e Data */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <span className="text-gray-300 text-sm mb-2">Data de Início</span>
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
            <span className="text-gray-300 text-sm mb-2">Data de Fim</span>
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
            <span className="text-gray-300 text-sm mb-2">Período</span>
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

        {/* Gráfico */}
        <div className="flex-1 bg-gray-700 rounded-lg shadow-lg p-6">
          <Bar data={getDataByPeriod()} options={options} />
        </div>

        {/* Informações */}
        <div className="bg-gray-700 p-6 rounded-lg mt-6">
  <h2 className="text-white text-lg font-bold mb-4">Relatório</h2>
  <p className="text-gray-300">
    Período:{" "}
    {startDate?.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}{" "}
    -{" "}
    {endDate?.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}
  </p>
  <p className="text-gray-300 mt-2">Horas trabalhadas: 160</p>
  <p className="text-gray-300 mt-2">Horas extras: +8h</p>
  <p className="text-gray-300 mt-2">Saldo total: +16h</p>
</div>

      </div>
    </div>
  );
}

export default EmployeeHours;
