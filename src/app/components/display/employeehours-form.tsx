"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { HoursBankService, HoursBankFilter } from "@/app/services/hoursBankService";
import { Navigation } from "../navigation/navigation";
import DropdownCheckboxEmployee from "../DropDown/dropdown-employees";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function EmployeeDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [barChartData, setBarChartData] = useState<unknown>(null);
  const [pieChartData, setPieChartData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  registerLocale("pt-BR", ptBR);

  // API configuration
  const API_URL = "/api/proxy";  // Using proxy to bypass CORS
  const API_USER = "token";
  const API_TOKEN_BASE = "QS7lc@HwpO3D!E!ajxDS";

  const hoursBankService = new HoursBankService(API_URL, API_USER, API_TOKEN_BASE);

  /**
   * Fetches employee hours data using the selected employee's ID (cod_pessoa)
   * and the date filters.
   */
  const fetchEmployeeData = async () => {
    if (!startDate || !endDate || !selectedEmployee) return;

    const employeeCode = parseInt(selectedEmployee, 10);
    if (isNaN(employeeCode)) {
      setError("Código do funcionário inválido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const filter: HoursBankFilter = {
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
        cod_pessoa: employeeCode,
      };

      const data = await hoursBankService.getBankHoursExtract(filter);
      console.log("API Response Data:", data);

      // Check for success or error in the API response
      if (data.success === false) {
        console.error("API Error:", data.info);
        setError(data.info || "Erro ao carregar os dados.");
        return;
      }

      // Safely access data arrays with default values
      const labels = Array.isArray(data.labels) ? data.labels : [];
      const workedHours = Array.isArray(data.workedHours) ? data.workedHours : [];
      const extraHours = Array.isArray(data.extraHours) ? data.extraHours : [];

      // Format data for the bar chart
      setBarChartData({
        labels,
        datasets: [
          {
            label: "Horas Trabalhadas",
            data: workedHours,
            backgroundColor: "rgba(75, 192, 192, 0.8)",
          },
          {
            label: "Horas Extras",
            data: extraHours,
            backgroundColor: "rgba(255, 99, 132, 0.8)",
          },
        ],
      });

      // Aggregate totals for the pie chart
      const totalWorked = workedHours.reduce((acc: number, val: number) => acc + val, 0);
      const totalExtra = extraHours.reduce((acc: number, val: number) => acc + val, 0);
      setPieChartData({
        labels: ["Horas Trabalhadas", "Horas Extras"],
        datasets: [
          {
            data: [totalWorked, totalExtra],
            backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(255, 99, 132, 0.8)"],
          },
        ],
      });
    } catch (err: unknown) {
      console.error("Fetch Error:", err);
      setError((err as Error).message || "Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };


  // Trigger the API call whenever the date filters or selected employee changes.
  useEffect(() => {
    fetchEmployeeData();
  }, [startDate, endDate, selectedEmployee]);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Dashboard - Horas do Funcionário" },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Proporção de Horas" },
    },
  };

  return (
    <div
      className="h-screen bg-gray-900 flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(to bottom right, rgb(11,20,11), rgb(79,116,82))" }}
    >
      <Navigation />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <h1 className="text-white text-3xl font-bold">Dashboard do Banco de Horas</h1>

          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-col w-72">
              <label className="text-gray-300 text-sm mb-2">Funcionário</label>
              <DropdownCheckboxEmployee
                value={selectedEmployee}
                onChange={(employeeId) => setSelectedEmployee(employeeId)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-700 rounded-lg shadow-lg p-6">
              {loading ? <p className="text-gray-300 text-center">Carregando dados...</p> :
                error ? <p className="text-red-500 text-center">{error}</p> :
                barChartData ? <Bar data={barChartData} options={barOptions} /> :
                <p className="text-gray-300 text-center">Preencha os filtros para visualizar os dados.</p>}
            </div>
            <div className="bg-gray-700 rounded-lg shadow-lg p-6">
              {pieChartData ? <Pie data={pieChartData} options={pieOptions} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
