"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userInputSchema, UserService } from "@/app/schemas/userSchema";
import { UserFormProps } from "@/app/schemas/userSchema";
import { z } from "zod";

export default function UserForm({ onSave, onCancel }: UserFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<z.infer<typeof userInputSchema>>({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /**
   * 🚀 Atualiza os campos e valida os dados em tempo real.
   */
  const handleInputChange = <K extends keyof z.infer<typeof userInputSchema>>(
    field: K,
    value: z.infer<typeof userInputSchema>[K]
  ) => {
    const updatedData = { ...formData, [field]: value };

    try {
      userInputSchema.parse(updatedData);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path.length > 0) {
            fieldErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
    }

    setFormData(updatedData);
  };

  /**
   * 🚀 Salvar usuário
   */
  const handleSave = async () => {
    if (loading) return;

    if (formData.password !== confirmPassword) {
      setErrors({ confirmPassword: "As senhas não coincidem." });
      return;
    }

    try {
      setLoading(true);
      const validatedData = userInputSchema.parse(formData);
      const newUser = await UserService.createUser(validatedData);

      console.log("Usuário criado com sucesso!", newUser);
      await onSave?.(newUser);
      router.push("/user-display/user-list");
    } catch (error) {
      console.error("❌ Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Usuário</h2>
        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block mb-2 text-white">Nome</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full p-2 rounded border ${errors.name ? "border-red-500" : "border-gray-300"} bg-gray-700 text-white`}
              placeholder="Digite o nome do usuário"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-white">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full p-2 rounded border ${errors.email ? "border-red-500" : "border-gray-300"} bg-gray-700 text-white`}
              placeholder="Digite o email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="password" className="block mb-2 text-white">Senha</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full p-2 rounded border ${errors.password ? "border-red-500" : "border-gray-300"} bg-gray-700 text-white`}
              placeholder="Digite a senha"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-white">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 rounded border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} bg-gray-700 text-white`}
              placeholder="Confirme a senha"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Botões */}
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
  );
}
