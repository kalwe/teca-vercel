import { useEffect, useState } from "react";
import { ContactData, ContactProps } from "@/app/types/employee";
import { emailSchema } from "@/app/schemas/common/emailSchema";
import { phoneSchema } from "@/app/schemas/common/phoneSchema";
import { websiteSchema } from "@/app/schemas/common/urlSchema";

export function Contact({
  data = { tipoContato: "", informacao: "" }, // Default values
  onChange,
  isEditable,
  onNext,
  onPrev,
}: ContactProps) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentData: ContactData = {
    tipoContato: data.tipoContato || "",
    informacao: data.informacao || "",
  };

  // Validate required fields and apply schema validation
  useEffect(() => {
    const isValid =
      currentData.tipoContato.trim() !== "" &&
      currentData.informacao.trim() !== "";

    if (isValid) {
      try {
        if (currentData.tipoContato === "email") {
          emailSchema.parse(currentData.informacao);
        } else if (currentData.tipoContato === "telefone") {
          phoneSchema.parse(currentData.informacao);
        } else if (currentData.tipoContato === "website") {
          websiteSchema.parse(currentData.informacao);
        }
        setError(null); // No validation errors
        setIsNextEnabled(true);
      } catch (err: any) {
        setError(err.errors[0].message); // Capture schema validation error
        setIsNextEnabled(false);
      }
    } else {
      setError("Preencha todos os campos obrigatórios");
      setIsNextEnabled(false);
    }
  }, [currentData]);

  const handleInputChange = (field: keyof ContactData, value: string) => {
    onChange({ ...currentData, [field]: value });
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-[100%]">
      {/* Tipo de Contato */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tipo de Contato</label>
        <select
          value={currentData.tipoContato}
          onChange={(e) => handleInputChange("tipoContato", e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditable}
        >
          <option value="">-- Selecione --</option>
          <option value="email">E-mail</option>
          <option value="telefone">Telefone</option>
          <option value="website">Website</option>
        </select>
      </div>
      {/* Informação */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Informação</label>
        <input
          type="text"
          value={currentData.informacao}
          onChange={(e) => handleInputChange("informacao", e.target.value)}
          placeholder="Digite o contato"
          className={`w-full bg-gray-700 text-white placeholder-gray-400 border ${
            error ? "border-red-500" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={!isEditable}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

    </div>
  );
}
