"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext"; // Importa o contexto do usuário
import "./style.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loggedInUser } = useUserContext(); // Usa login e loggedInUser do contexto
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Tela de loading (2 segundos)
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setLoading(true); // Ativar o loading novamente

    setTimeout(() => {
      // Valida o login pelo contexto
      const isLoggedIn = login(username, password); // Usando username no login
      if (isLoggedIn) {
        alert(`Bem-vindo(a), ${loggedInUser?.username || "Usuário"}!`);
        router.push("/dashboard-display");
      } else {
        alert("Credenciais inválidas! Verifique seu username e senha.");
        setLoading(false);
      }
    }, 2000); // Simula um delay de 2 segundos
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#3C4A34]">
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
      {/* Fundo com Blur */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/path-to-your-image.jpg')", // Coloque o caminho da imagem aqui
          filter: "blur(8px)", // Efeito de blur
          zIndex: -1,
        }}
      ></div>

      {/* Login */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2
        -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-br
        from-gray-800 to-gray-900 bg-opacity-80 rounded-lg
        shadow-2xl flex items-center justify-center border border-gray-700"
      >
        <div className="w-[460px] h-[355px] rounded-lg flex flex-col items-center p-6">
          <h1 className="text-white text-3xl font-bold mb-6">LOGIN</h1>

          {/* Input Username */}
          <div className="w-full relative mb-4">
            <input
              type="text"
              placeholder="Digite seu username"
              className="w-full text-center bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="border-t border-gray-500 w-full mt-1"></div>
          </div>

          {/* Input Senha */}
          <div className="w-full relative mb-6">
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full text-center bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="border-t border-gray-500 w-full mt-1"></div>
          </div>

          {/* Botão Entrar */}
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Entrar
          </button>
        </div>
      </div>

      {/* Suporte */}
      <div className="absolute bottom-4 right-4 flex items-center text-gray-300">
        <span className="mr-1 text-lg">?</span>
        <button className="text-sm font-semibold hover:text-white hover:underline">
          Suporte
        </button>
      </div>
    </div>
  );
}
