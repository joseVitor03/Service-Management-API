# Usar a imagem node:18-alpine como base
FROM node:18-alpine
# Mudar para o diretório de trabalho /playlist-films
WORKDIR /back-end-oficina
# Copiar os package.json e package-lock.json para o container
COPY package*.json .
# Instalar as dependências Node
RUN npm ci
# Copiar o restante dos arquivos da aplicação para o container
COPY . .
# Sinalize que aplicação expõe a porta 3001
EXPOSE 3001
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT [ "npm", "run", "dev" ]
# Dica: Leia a seção Docker e Docker-compose no README para mais informações