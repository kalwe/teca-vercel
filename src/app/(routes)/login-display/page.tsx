"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // TODO: why you use setTimeout?
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loading screen for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    //  TODO: if already set true as default on line 8 don`t need set again
    setLoading(true); // Activate loading screen

    try {
      // TODO: create const for base api url
      // API_URL = "/api/v1"
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Bem-vindo(a), ${data.username}!`);
        router.push("/dashboard-display");
      } else {
        const error = await response.text();
        alert(`Erro: ${error}`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      setLoading(false);
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
        style={{
          background: "linear-gradient(90deg,rgb(11, 20, 11),rgb(79, 116, 82))",
          zIndex: -1,
        }}
      ></div>

      {/* Login */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "400px",
          background: "linear-gradient(to bottom right,rgb(11, 20, 11),rgb(79, 116, 82))",
          opacity: 0.9,
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(8, 4, 4, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="w-[460px] h-[355px] rounded-lg flex flex-col items-center p-6">
          <h1 className="text-white text-3xl font-bold mb-6">LOGIN</h1>

          {/* Input Username */}
          <div className="w-full relative mb-4">
            <input
              type="text"
              placeholder="Digite seu username"
              className="w-full text-center bg-transparent border-none outline-none text-white placeholder-gray-300 text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="border-t border-white w-full mt-1"></div>
          </div>

          {/* Input Password */}
          <div className="w-full relative mb-6">
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full text-center bg-transparent border-none outline-none text-white placeholder-gray-300 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="border-t border-white w-full mt-1"></div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Entrar
          </button>
        </div>
      </div>

    </div>
  );
}
