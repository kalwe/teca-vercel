"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import { emailSchema } from "@/app/schemas/common/emailSchema";

export default function UserForm({
  mode,
  userData,
  onSave,
  onCancel,
}: {
  mode: "edit" | "create";
  userData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      try {
        emailSchema.parse(value);
        setEmailError(null);
      } catch (err: any) {
        setEmailError(err.errors[0].message);
      }
    }
  };

  const handleSave = () => {
    if (!formData.username.trim()) {
      alert("Erro: O campo 'Username' é obrigatório.");
      return;
    }
    if (!formData.email.trim()) {
      alert("Erro: O campo 'Email' é obrigatório.");
      return;
    }
    if (emailError) {
      alert("Erro: " + emailError);
      return;
    }

    if (mode === "create" && !formData.password.trim()) {
      alert("Erro: O campo 'Senha' é obrigatório para criação.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Erro: As senhas não coincidem.");
      return;
    }

    const updatedData = {
      ...userData,
      username: formData.username,
      email: formData.email,
      ...(formData.password && { password: formData.password }),
    };

    onSave(updatedData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {mode === "edit" ? "Editar Usuário" : "Criar Usuário"}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2 text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 bg-gray-700 text-white"
                placeholder="Digite o nome de usuário"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 rounded border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } bg-gray-700 text-white`}
                placeholder="Digite o email"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-white">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 bg-gray-700 text-white"
                placeholder="Digite a senha"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-white">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 bg-gray-700 text-white"
                placeholder="Confirme a senha"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
            >
              Salvar
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all ml-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
