'use client'

import { useRouter } from "next/navigation"

interface DashboardWidgetProps {
  title: string
  data: any[] // cria um type juntando os types ex: type Data = Employees | Vacancies | Reminders
  maxItems: number
  navigateTo: string
  loading: boolean
  bgGradient: string
}



export function DashboardWidget({
  title,
  data,
  maxItems,
  navigateTo,
  loading,
  bgGradient,
}: DashboardWidgetProps) {
  const router = useRouter()

  return (
    <div
      className={`p-10 rounded-2xl shadow-2xl bg-gradient-to-br ${bgGradient} transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between animate-slideIn`}
      onClick={() => router.push(navigateTo)}
    >
      <h2 className="text-3xl font-semibold mb-6 text-[#C8DAC5]">{title}</h2>
      {loading ? (
        <p className="text-gray-400 text-lg animate-pulse">Carregando...</p>
      ) : data.length > 0 ? (
        <ul className="text-gray-300 text-lg space-y-3">
          {data.slice(0, maxItems).map((item, index) => (
            <li key={index} className="hover:text-[#A8C5A8] transition-all text-xl">
              {/* TODO: isso nao vai bugar pois somente alguns items tem position e reason */}
              {item.name || item.position || item.reason}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">Nenhum dado encontrado.</p>
      )}
    </div>
  )
}
