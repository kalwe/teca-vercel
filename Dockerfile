# Usa a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro para otimizar cache
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta usada pelo Next.js
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
