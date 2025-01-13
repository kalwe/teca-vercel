import { useFormData } from "@/app/context/FormDataContext";

export function ResumoFuncionario() {
  const { formData } = useFormData();

  const isComplete = Object.values(formData).every((section) =>
    Object.values(section).every((value) => value !== "")
  );

  if (!isComplete) {
    return <p>Por favor, preencha todas as abas antes de visualizar o resumo.</p>;
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md space-y-4 w-full">
      <h2 className="text-2xl text-white">Resumo do Funcionário</h2>
      <div className="text-white">
        <p><strong>Nome:</strong> {formData.pessoaFisica.nome}</p>
        <p><strong>CPF:</strong> {formData.pessoaFisica.cpf}</p>
        <p><strong>Função:</strong> {formData.funcionario.funcao}</p>
        <p><strong>Banco:</strong> {formData.dadosBancarios.banco}</p>
        <p><strong>Endereço:</strong> {`${formData.endereco.logradouro}, ${formData.endereco.bairro}, ${formData.endereco.municipio}`}</p>
        <p><strong>Contato:</strong> {formData.contato.informacao}</p>
        {/* Adicione outras informações conforme necessário */}
      </div>
    </div>
  );
}
