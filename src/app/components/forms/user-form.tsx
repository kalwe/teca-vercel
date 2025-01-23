"use client";

import { useState } from "react";
import { useUserContext } from "@/app/context/UserContext"; // Ensure proper context import
import { useRouter } from "next/navigation";
import { emailSchema } from "@/app/schemas/common/emailSchema"; // Import the email schema from its location

export default function UserCreationForm() {
  const { addUser } = useUserContext(); // Fetch addUser from context
  const router = useRouter();

  // TODO: use schema UserSchema
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
    <div className="flex items-center justify-center min-h-screen p-4" style={{ background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Form Content */}
          <div className="w-full md:w-3/4 p-6">
            <div className="p-8 bg-gray-900 text-white rounded-lg">
              <h2 className="text-xl font-bold mb-4">Criação de Usuário</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 bg-gray-800 text-white"
                    placeholder="Digite o nome de usuário"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded border ${emailError ? "border-red-500" : "border-gray-300"} bg-gray-800 text-white`}
                    placeholder="Digite o email"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 bg-gray-800 text-white"
                    placeholder="Digite a senha"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 bg-gray-800 text-white"
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
    </div>
  );
}
