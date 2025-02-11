"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import crypto from "crypto"; // Importação correta para SHA-256
import { Navigation } from "../navigation/navigation";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmployeeHours() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [employeeName, setEmployeeName] = useState("");
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  registerLocale("pt-BR", ptBR);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const API_USER = process.env.NEXT_PUBLIC_API_USER || "";
  const API_TOKEN_BASE = process.env.NEXT_PUBLIC_API_TOKEN_BASE || "";

  const generateToken = (baseToken: string) => {
    const today = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const tokenString = `${baseToken}${today}`;
    return crypto.createHash("sha256").update(tokenString).digest("hex");
  };

  const fetchEmployeeData = async () => {
    if (!startDate || !endDate || !employeeName) return;

    setLoading(true);
    setError(null);

    try {
      const token = generateToken(API_TOKEN_BASE);

      const headers = {
        "Content-Type": "application/json",
        User: API_USER,
        Token: token,
      };

      const body = {
        pag: "ponto_espelho_1510",
        cmd: "get",
        dtde: startDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        dtate: endDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        nome_pessoa: employeeName,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const data = await response.json();

      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: "Horas Trabalhadas",
            data: data.workedHours,
            backgroundColor: "rgba(75, 192, 192, 0.8)",
          },
          {
            label: "Horas Extras",
            data: data.extraHours,
            backgroundColor: "rgba(255, 99, 132, 0.8)",
          },
        ],
      });
    } catch (err: any) {
      setError(err.message || "Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [startDate, endDate, employeeName]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Resumo das Horas`,
      },
    },
  };

  return (
    <div
      className="h-screen bg-gray-900 flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))",
      }}
    >
      <Navigation />

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <h1 className="text-white text-3xl font-bold">Banco de Horas</h1>

          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm mb-2">Nome do Funcionário</label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                placeholder="Digite o nome"
              />
            </div>

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
          </div>

          <div className="flex-1 bg-gray-700 rounded-lg shadow-lg p-6">
            {loading ? (
              <p className="text-gray-300 text-center">Carregando dados...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : chartData ? (
              <Bar data={chartData} options={options} />
            ) : (
              <p className="text-gray-300 text-center">
                Selecione uma data e funcionário para visualizar os dados.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHours;
