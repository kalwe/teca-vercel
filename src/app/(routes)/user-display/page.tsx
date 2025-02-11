"use client";

import UserCreationForm from "@/app/components/display/user-form";
import "./style.css";
import { useRouter } from "next/navigation";

import { Navigation } from "@/app/components/navigation/navigation";

export default function Contract() {
const router = useRouter("")
  return (
    <div
    style={{
      background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
  }}
    >
      <Navigation />

      <UserCreationForm
        mode="create" //  Agora `mode` é aceito

        isEditable={true}

      />

      {/* Botão "Voltar" */}
      <div
        className="absolute left-6 bottom-6 text-white p-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center bg-gray-700"
      >
        <button
          className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/user-display/user-list/")}
          aria-label="Voltar para a lista de usuários"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
