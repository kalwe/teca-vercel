"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter, useParams } from "next/navigation";

export default function UserEdit() {
  const { users, addUser, updateUser } = useUserContext(); // Use context functions
  const router = useRouter();
  const params = useParams(); // Access dynamic route params

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isEditMode = Boolean(params.id); // Determine if we're in edit mode

  useEffect(() => {
    // Populate form data if editing
    if (isEditMode) {
      const userToEdit = users.find((user) => user.id === Number(params.id));
      if (userToEdit) {
        setFormData({
          username: userToEdit.username,
          email: userToEdit.email,
          password: "", // Password fields are not pre-filled for security
          confirmPassword: "",
        });
      } else {
        alert("Usuário não encontrado.");
        router.push("/user-display/user-list");
      }
    }
  }, [isEditMode, params.id, users, router]);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Validation
    if (!formData.username.trim()) {
      alert("Erro: O campo 'Username' é obrigatório.");
      return;
    }
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      alert("Erro: O campo 'Email' deve ser válido.");
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

    if (isEditMode) {
      // Update user
      updateUser(Number(params.id), {
        username: formData.username,
        email: formData.email,
      });
      alert("Usuário atualizado com sucesso!");
    } else {
      // Add new user
      addUser({
        username: formData.username,
        email: formData.email,
      });
      alert("Usuário criado com sucesso!");
    }

    router.push("/user-display/user-list"); // Redirect to the user list
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
            <h2 className="text-white text-xl font-bold mb-4">
              {isEditMode ? "Editar Usuário" : "Criação de Usuário"}
            </h2>

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
                  className="w-full p-2 rounded border"
                  placeholder="Digite o email"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-white block mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border"
                  placeholder="Digite a nova senha"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-white block mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border"
                  placeholder="Confirme a nova senha"
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
