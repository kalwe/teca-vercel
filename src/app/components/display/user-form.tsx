"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userInputSchema, UserService } from "@/app/schemas/userSchema";
import { UserFormProps } from "@/app/schemas/userSchema";

export default function UserForm({ onSave, onCancel }: UserFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validação dinâmica pelo Zod
    if (userInputSchema.shape[name as keyof typeof userInputSchema.shape]) {
      const fieldSchema = userInputSchema.shape[name as keyof typeof userInputSchema.shape];
      const result = fieldSchema.safeParse(value);

      setErrors((prev) => ({
        ...prev,
        [name]: result.success ? null : result.error.errors[0]?.message,
      }));
    }
  };

  const handleSave = async () => {
    if (loading) return;

    if (formData.password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Valida os dados antes do envio
      const validatedData = userInputSchema.parse(formData);

      // 🔹 Chama a API para criar o usuário (POST)
      const newUser = await UserService.createUser(validatedData);

      console.log("Usuário criado com sucesso!", newUser);

      // 🔹 Garante que `password` esteja presente antes de chamar `onSave`
      const userWithPassword = { ...newUser, password: validatedData.password };

      // 🔹 Aguarda `onSave` e passa os dados corretamente
      await onSave(userWithPassword);

      // 🔹 Redireciona após sucesso
      router.push("/user-display/user-list");

    } catch (error) {
      console.error("Erro ao criar usuário:", error);

      if (error instanceof Error) {
        alert(`Erro ao criar usuário: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Usuário</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-white">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 rounded border ${errors.name ? "border-red-500" : "border-gray-300"} bg-gray-700 text-white`}
                placeholder="Digite o nome do usuário"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 rounded border ${errors.email ? "border-red-500" : "border-gray-300"} bg-gray-700 text-white`}
                placeholder="Digite o email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-white">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 rounded border ${errors.password ? "border-red-500" : "border-gray-300"} bg-gray-700 text-white`}
                placeholder="Digite a senha"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-white">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 bg-gray-700 text-white"
                placeholder="Confirme a senha"
              />
              {formData.password !== confirmPassword && confirmPassword !== "" && (
                <p className="text-red-500 text-sm mt-1">As senhas não coincidem.</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
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
