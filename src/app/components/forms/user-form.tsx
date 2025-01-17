"use client";

import { useState } from "react";
import { useUserContext } from "@/app/context/UserContext"; // Ensure proper context import
import { useRouter } from "next/navigation";
import { emailSchema } from "@/app/schemas/common/emailSchema"; // Import the email schema from its location

export default function UserCreationForm() {
  const { addUser } = useUserContext(); // Fetch addUser from context
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null); // State to manage email validation errors

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate email in real-time
    if (name === "email") {
      try {
        emailSchema.parse(value); // Validate email using the zod schema
        setEmailError(null); // No error if validation passes
      } catch (err: any) {
        setEmailError(err.errors[0].message); // Capture and set the error message
      }
    }
  };

  const handleSave = () => {
    // Validation
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
    if (!formData.password.trim()) {
      alert("Erro: O campo 'Senha' é obrigatório.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Erro: As senhas não coincidem.");
      return;
    }

    // Add user to context
    addUser({
      username: formData.username,
      email: formData.email,
    });

    // Redirect to the User List
    alert("Usuário criado com sucesso!");
    router.push("/user-display/user-list");
  };

  return (
    <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
      <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6 relative">
        <div className="bg-[#829171] w-[98%] h-[95%] rounded-[26px] absolute"></div>
        <div
          style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }}
          className="bg-[#7A7A7A] w-[87%] h-[85%] rounded-[18px]"
        >
          {/* Form Content */}
          <div className="p-8">
            <h2 className="text-white text-xl font-bold mb-4">Criação de Usuário</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="text-white block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border"
                  placeholder="Digite o nome de usuário"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-white block mb-2">
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
                  }`}
                  placeholder="Digite o email"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="text-white block mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border"
                  placeholder="Digite a senha"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-white block mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border"
                  placeholder="Confirme a senha"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
