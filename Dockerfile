# Imagem base com Node 22 (slim base em Debian)
FROM node:22-slim

# OpenSSL exigido pelo motor do Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Pasta de trabalho dentro do container
WORKDIR /app

# Copia os manifests primeiro para aproveitar o cache de dependências
COPY package*.json ./

# Instala as dependências de forma reprodutível
RUN npm ci

# Copia o restante do código e a pasta prisma para dentro do container
COPY . .

# Gera o cliente Prisma (agora o arquivo prisma/schema.prisma já existe no container)
RUN ./node_modules/.bin/prisma generate