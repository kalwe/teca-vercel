"use client";

import { useRouter } from "next/navigation";

interface ComebackButtonProps {
  path?: string; // Caminho de redirecionamento (padrão: "/dashboard-display/")
}

export default function ComebackButton({ path = "/dashboard-display/" }: ComebackButtonProps) {
  const router = useRouter();

  return (
    <div className="fixed bottom-10 left-6 z-50 sm:bottom-6 sm:left-6">
      <button
        onClick={() => router.push(path)}
        className="w-14 h-14 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 sm:w-12 sm:h-12"
      >
        {/* Ícone de seta para voltar */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 transition-colors duration-300 hover:text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}
