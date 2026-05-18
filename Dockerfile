# Estágio 1: Build (Construção da aplicação)
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala TODAS as dependências (incluindo as de desenvolvimento, necessárias para o build)
RUN npm install

# Copia todo o código-fonte para o container
COPY . .

# Executa o build do NestJS (gera a pasta dist/)
RUN npm run build

# ---------------------------------------------------
# Estágio 2: Produção (Imagem final otimizada e mais leve)
FROM node:20-alpine AS production

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos de configuração de pacotes
COPY package*.json ./

# Instala APENAS as dependências de produção (ignora devDependencies)
RUN npm install --only=production && npm cache clean --force

# Copia a pasta dist/ (resultado do build) do estágio anterior
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a aplicação vai utilizar (O NestJS usa a 3000 por padrão)
EXPOSE 3000

# Comando para iniciar a aplicação (baseado no seu package.json)
CMD ["npm", "run", "start:prod"]