import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useFormData } from "@/app/context/FormDataContext";

interface VestuarioProps {
  data: {
    tamanhoCamisa: string;
    tamanhoCalca: string;
    tamanhoCalcado: string;
  };
  onChange: (updatedData: VestuarioProps["data"]) => void;
  onValid?: (isValid: boolean) => void;
}

export function Vestuario({ data, onChange, onValid }: VestuarioProps) {
  const router = useRouter(); // Hook para redirecionamento
  const { addEmployee } = useEmployeeContext(); // Importa o contexto de funcionários
  const { formData } = useFormData(); // Obtém os dados de todas as abas
  const [erro, setErro] = useState({ calca: "", calcado: "" });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Validação dos campos
  useEffect(() => {
    const isValid =
      (data.tamanhoCamisa?.trim() || "") !== "" &&
      (data.tamanhoCalca?.trim() || "") !== "" &&
      (data.tamanhoCalcado?.trim() || "") !== "" &&
      erro.calca === "" &&
      erro.calcado === "";

    setIsSaveEnabled(isValid); // Habilita ou desabilita o botão "Salvar"

    if (onValid) {
      onValid(isValid);
    }
  }, [data, erro, onValid]);

  const handleInputChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleCalcaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setErro((prev) => ({ ...prev, calca: "" }));
      handleInputChange("tamanhoCalca", value);
    } else {
      setErro((prev) => ({ ...prev, calca: "Apenas números são permitidos." }));
    }
  };

  const handleCalcadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setErro((prev) => ({ ...prev, calcado: "" }));
      handleInputChange("tamanhoCalcado", value);
    } else {
      setErro((prev) => ({
        ...prev,
        calcado: "Apenas números são permitidos.",
      }));
    }
  };

  const handleSave = () => {
    console.log("Dados do FormDataContext:", formData);

    addEmployee({
      id: Math.random(),
      name: formData.pessoaFisica.nome || "Nome não informado",
      role: formData.funcionario?.funcao || "Função não informada",
      registration: formData.funcionario?.matricula || "Matrícula não informada",
      cpf: formData.pessoaFisica.cpf || "CPF não informado",
      supervisor: formData.funcionario?.encarregado || false,
      manager: formData.funcionario?.gerente || false,
      active: true,
      pessoaFisica: {undefined},
      funcionario: {undefined},
      address: {undefined},
      contact: {undefined},
      bank: {undefined},
      vestuario: {undefined}
    });


    router.push("/contract-display/employee");
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-8 w-[100%]">
      {/* Tamanho Camisa */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho Camisa</label>
        <input
          type="text"
          value={data.tamanhoCamisa || ""}
          onChange={(e) => handleInputChange("tamanhoCamisa", e.target.value)}
          placeholder="Digite o tamanho da camisa"
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Tamanho Calça */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho Calça</label>
        <input
          type="text"
          value={data.tamanhoCalca || ""}
          onChange={handleCalcaChange}
          placeholder="Digite o tamanho da calça (somente números)"
          className={`w-full bg-gray-700 text-white placeholder-gray-400 border ${
            erro.calca ? "border-red-600" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 ${
            erro.calca ? "focus:ring-red-500" : "focus:ring-green-500"
          }`}
        />
        {erro.calca && <p className="text-red-500 text-sm mt-1">{erro.calca}</p>}
      </div>
      {/* Tamanho Calçado */}
      <div className="w-full">
        <label className="block text-gray-400 mb-2">Tamanho Calçado</label>
        <input
          type="text"
          value={data.tamanhoCalcado || ""}
          onChange={handleCalcadoChange}
          placeholder="Digite o tamanho do calçado (somente números)"
          className={`w-full bg-gray-700 text-white placeholder-gray-400 border ${
            erro.calcado ? "border-red-600" : "border-gray-600"
          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 ${
            erro.calcado ? "focus:ring-red-500" : "focus:ring-green-500"
          }`}
        />
        {erro.calcado && (
          <p className="text-red-500 text-sm mt-1">{erro.calcado}</p>
        )}
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end mt-6">
        <button
          onClick={isSaveEnabled ? handleSave : undefined}
          disabled={!isSaveEnabled}
          className={`px-6 py-2 rounded-md text-white ${
            isSaveEnabled
              ? "bg-green-600 hover:bg-green-500"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
