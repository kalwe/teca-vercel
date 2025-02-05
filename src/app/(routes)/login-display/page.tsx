"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/services/authService";
import { loginSchema } from "@/app/schemas/authSchema";
import { LoginData } from "@/app/types/authType";

import "./style.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState<LoginData>({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({}); // Armazena erros de validação
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field: keyof LoginData, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      // ✅ Validação com Zod antes de enviar para API
      loginSchema.parse(credentials);
      setErrors({}); // Limpa os erros se passar na validação

      // ✅ Envia para a API via Service
      const response = await AuthService.login(credentials);

      // ✅ Armazena o token no localStorage para persistência
      localStorage.setItem("token", response.token);

      alert(`✅ Bem-vindo(a), ${response.username}!`);
      router.push("/dashboard-display");
    } catch (error: any) {
      setLoading(false);

      if (error.name === "ZodError") {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        alert("❌ Erro ao conectar ao servidor. Verifique suas credenciais.");
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#4CAF50]">
        <div className="flex items-center space-x-2 animate-bounce">
          <span className="text-white text-4xl font-bold">C</span>
          <span className="text-white text-4xl font-bold">O</span>
          <span className="text-white text-4xl font-bold">I</span>
          <span className="text-white text-4xl font-bold">F</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative">
      {/* Green background */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: "linear-gradient(90deg,rgb(11, 20, 11),rgb(79, 116, 82))", zIndex: -1 }}
      ></div>

      {/* Login */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-gradient-to-br from-[#0B140B] to-[#4F7452] opacity-90 rounded-lg shadow-lg flex flex-col items-center p-6">
        <h1 className="text-white text-3xl font-bold mb-6">LOGIN</h1>

        {/* Input Username */}
        <div className="w-full relative mb-4">
          <input
            type="text"
            placeholder="Digite seu username"
            className="w-full text-center bg-transparent border-none outline-none text-white placeholder-gray-300 text-lg"
            value={credentials.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <div className="border-t border-white w-full mt-1"></div>
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>

        {/* Input Password */}
        <div className="w-full relative mb-6">
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full text-center bg-transparent border-none outline-none text-white placeholder-gray-300 text-lg"
            value={credentials.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <div className="border-t border-white w-full mt-1"></div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}
