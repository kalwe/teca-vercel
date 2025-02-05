import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userInputSchema } from "@/app/schemas/userSchema";
import { UserInput, UserOutput, UserFormProps } from "@/app/types/user"; // ✅ Agora `UserFormProps` está importado corretamente!

export default function UserForm({ mode, userData, onSave, onCancel }: UserFormProps) {
  const router = useRouter();

  // ✅ Estado inicial seguro baseado no `userInputSchema`
  const [formData, setFormData] = useState<UserInput>(() =>
    userInputSchema.parse({
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
    })
  );

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(userData === undefined);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        password: "", // ✅ Nunca carregar senhas antigas
      });
      setLoading(false);
    }
  }, [userData]);

  if (loading) return <p className="text-white text-center">🔄 Carregando...</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ Validação dinâmica pelo Zod
    if (name in userInputSchema.shape) {
      try {
        const fieldSchema = userInputSchema.shape[name as keyof typeof userInputSchema.shape];
        const result = fieldSchema.safeParse(value);
        setErrors((prev) => ({
          ...prev,
          [name]: result.success ? null : result.error.errors[0].message,
        }));
      } catch {
        setErrors((prev) => ({
          ...prev,
          [name]: "Erro inesperado na validação.",
        }));
      }
    }
  };

  const handleSave = async () => {
    const parsedData = userInputSchema.safeParse(formData);
    if (!parsedData.success) {
      const validationErrors: Record<string, string> = {};
      parsedData.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return;
    }

    if (mode === "create") {
      if (!formData.password.trim()) {
        alert("❌ O campo 'Senha' é obrigatório para criação.");
        return;
      }
      if (formData.password !== confirmPassword) {
        alert("❌ As senhas não coincidem.");
        return;
      }
    }

    console.log("✅ Usuário salvo com sucesso!", formData);
    await onSave(formData);

    router.push("/user-display/user-list");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {mode === "edit" ? "✏ Editar Usuário" : "➕ Criar Usuário"}
          </h2>
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
            {mode === "create" && (
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
                {formData.password !== confirmPassword && <p className="text-red-500 text-sm mt-1">As senhas não coincidem.</p>}
              </div>
            )}
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
