import { useState, useEffect } from "react";
import { PessoaFisica } from "../switch-tabs/pessoa-fisica";
import { Funcionario } from "../switch-tabs/funcionario";
import { Address } from "../switch-tabs/address";
import { Contact } from "../switch-tabs/Contact";
import { Bank } from "../switch-tabs/bank";
import { Vestuario } from "../switch-tabs/vestuario";

interface ContractFormProps {
  formData: any; // Dados do formulário (ajuste conforme necessário para maior tipagem)
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Função para atualizar o estado do formulário
  mode: "add" | "edit" | "view"; // Define o modo
  onSave: (data: any) => void; // Função chamada ao salvar
  onCancel: () => void; // Função chamada ao cancelar
  employeeData?: any; // Dados do funcionário (para editar ou visualizar)
  isEditable: boolean;
}

export default function ContractForm({
  mode,
  employeeData,
  onSave,
  onCancel,
}: ContractFormProps) {
  const [formData, setFormData] = useState<any>({
    pessoaFisica: {
      nome: "",
      cpf: "",
      genero: "",
      estadoCivil: "",
      rg: "",
      orgaoExpedidor: "",
      selectedDate: null,
    },
    funcionario: {},
    address: {},
    contact: {},
    bank: {},
    vestuario: {},
  });

  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preenche os dados ao editar ou visualizar
  useEffect(() => {
    if (mode !== "add" && employeeData) {
      setFormData({
        pessoaFisica: employeeData.pessoaFisica || {},
        funcionario: employeeData.funcionario || {},
        address: employeeData.address || {},
        contact: employeeData.contact || {},
        bank: employeeData.bank || {},
        vestuario: employeeData.vestuario || {},
      });
    }
    setIsLoading(false);
  }, [mode, employeeData]);

  const tabs = [
    { name: "PESSOA FÍSICA", component: PessoaFisica, key: "pessoaFisica" },
    { name: "FUNCIONÁRIO", component: Funcionario, key: "funcionario" },
    { name: "ENDEREÇO", component: Address, key: "address" },
    { name: "CONTATO", component: Contact, key: "contact" },
    { name: "DADOS BANCÁRIOS", component: Bank, key: "bank" },
    { name: "VESTUÁRIO", component: Vestuario, key: "vestuario" },
  ];

  const handleInputChange = (updatedData: any, key: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: updatedData,
    }));
  };

  const isEditable = mode !== "view"; // Campos editáveis apenas em adicionar/editar
  const CurrentComponent = tabs[selectedTab].component;
  const currentTabKey = tabs[selectedTab].key;

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] bg-transparent rounded-[51px] flex items-center justify-center shadow-lg border-2 border-white">
      <div className="w-[95%] h-[92%] bg-customGreen rounded-lg flex flex-col items-center p-6 relative">
        <div className="bg-[#829171] w-[98%] h-[95%] rounded-[26px] absolute"></div>
        <div
          style={{ zIndex: 10, position: "absolute", top: "10%", left: "8%" }}
          className="bg-[#7A7A7A] w-[87%] h-[85%] rounded-[18px]"
        >
          {/* Botões para Navegar nas Abas */}
          <div className="flex space-x-4 p-4 border-b border-gray-300">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(index)}
                className={`px-4 py-2 rounded-t-lg ${
                  selectedTab === index
                    ? "bg-white text-gray-700 font-bold"
                    : "bg-transparent text-gray-400"
                } hover:bg-gray-600 hover:text-white`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Componente Atual */}
          <div className="p-8">
            <CurrentComponent
              data={formData[currentTabKey]}
              onChange={(updatedData: any) =>
                handleInputChange(updatedData, currentTabKey)
              }
              isEditable={isEditable} // Passa o estado de edição
              onNext={() =>
                setSelectedTab((prev) => Math.min(prev + 1, tabs.length - 1))
              } // Função para ir para a próxima aba
              onPrev={() => setSelectedTab((prev) => Math.max(prev - 1, 0))} // Função para voltar para a aba anterior
            />
          </div>
          {/* Botões Salvar e Cancelar */}
          <div className="flex justify-end p-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded mr-2 hover:bg-red-600"
            >
              Cancelar
            </button>
            {isEditable && (
              <button
                onClick={() => onSave(formData)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
